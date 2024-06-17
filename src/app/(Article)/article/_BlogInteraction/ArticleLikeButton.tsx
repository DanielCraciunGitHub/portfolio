import { useEffect, useRef, useState } from "react"
import { useParams } from "next/navigation"
import { api } from "@/server/client"
import { debounce } from "lodash"
import { useSession } from "next-auth/react"

import { useKeybind } from "@/hooks/useKeybind"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import AuthButton from "@/components/Buttons/AuthButton"
import { LoginModal } from "@/components/LoginModal"

import { LikeHeart } from "./LikeHeart"

export const ArticleLikeButton = () => {
  const { title: currentSlug }: { title: string } = useParams()

  const buttonRef = useRef<HTMLButtonElement>(null)

  useKeybind(
    buttonRef,
    { key: "l", ctrlKey: true },
    debounce(async () => {
      // 250ms debounced used to prevent API overload
      await updateLikeCount({
        slug: currentSlug,
        isLiked: likesData!.isLiked,
      })
    }, 250)
  )

  const { data: session } = useSession()

  const { data, refetch: invalidateLikeData } =
    api.blogRouter.getArticleLikeData.useQuery(
      { slug: currentSlug },
      {
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
      }
    )
  const [likesData, setLikesData] = useState(data)
  useEffect(() => {
    setLikesData(data)
  }, [data])

  const { mutateAsync: updateLikeCount } =
    api.blogRouter.updateArticleLikes.useMutation({
      onMutate: () => {
        // optimistic update of like count
        if (likesData!.isLiked) {
          setLikesData((prev) => ({ isLiked: false, likes: prev!.likes - 1 }))
        } else {
          setLikesData((prev) => ({ isLiked: true, likes: prev!.likes + 1 }))
        }
      },
      onSuccess: () => {
        invalidateLikeData()
      },
    })

  return (
    <div className="flex items-center text-white">
      <Popover>
        {session ? (
          <Button
            variant="ghost"
            className="hover:bg-inherit hover:text-inherit"
            size="icon"
            ref={buttonRef}
            onClick={debounce(async () => {
              // 250ms debounced used to prevent API overload
              await updateLikeCount({
                slug: currentSlug,
                isLiked: likesData!.isLiked,
              })
            }, 250)}
          >
            <LikeHeart isLiked={likesData?.isLiked} />
          </Button>
        ) : (
          <LoginModal
            buttonNode={
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-inherit hover:text-inherit"
              >
                <LikeHeart isLiked={likesData?.isLiked} />
              </Button>
            }
          />
        )}
        <PopoverContent className="flex flex-col space-y-4 border-muted-foreground/50 text-center">
          <Label>Login to like this article ❤️</Label>
          <AuthButton session={session} />
        </PopoverContent>
      </Popover>

      <div className="font-bold">{likesData?.likes ?? "--"}</div>
    </div>
  )
}
