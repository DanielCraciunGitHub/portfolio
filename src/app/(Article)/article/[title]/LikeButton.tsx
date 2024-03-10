import { useEffect, useState } from "react"
import { debounce } from "lodash"
import { Heart } from "lucide-react"
import { Session } from "next-auth"

import { LikeData } from "@/types/blog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import AuthButton from "@/components/AuthButton"
import { trpc } from "@/app/_trpc/client"

interface LikeButtonProps {
  currentSlug: string
  session: Session | null
  initialLikesData: LikeData
}
export const LikeButton = ({
  currentSlug,
  session,
  initialLikesData,
}: LikeButtonProps) => {
  const { data } = trpc.blogRouter.getArticleLikeData.useQuery(
    { slug: currentSlug, session },
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      initialData: initialLikesData,
    }
  )
  const [likesData, setLikesData] = useState(data)
  useEffect(() => {
    setLikesData(data)
  }, [data])

  const { mutateAsync: updateLikeCount } =
    trpc.blogRouter.updateArticleLikes.useMutation({
      onMutate: () => {
        // optimistic update of like count
        if (likesData!.isLiked) {
          setLikesData((prev) => ({ isLiked: false, likes: prev!.likes - 1 }))
        } else {
          setLikesData((prev) => ({ isLiked: true, likes: prev!.likes + 1 }))
        }
      },
    })

  return (
    <div className="flex items-center">
      <Popover>
        {session ? (
          <Button
            variant="ghost"
            size="icon"
            onClick={debounce(async () => {
              // 250ms debounced used to prevent API overload
              await updateLikeCount({
                session,
                slug: currentSlug,
                isLiked: likesData!.isLiked,
              })
            }, 250)}
          >
            <Heart fill={likesData?.isLiked ? "red" : "none"} />
          </Button>
        ) : (
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon">
              <Heart fill={likesData?.isLiked ? "red" : "none"} />
            </Button>
          </PopoverTrigger>
        )}
        <PopoverContent className="flex flex-col text-center space-y-4 border-muted-foreground/50">
          <Label>Login to like this article ❤️</Label>
          <AuthButton session={session} />
        </PopoverContent>
      </Popover>
      <div>{likesData?.likes ?? "0"}</div>
    </div>
  )
}
