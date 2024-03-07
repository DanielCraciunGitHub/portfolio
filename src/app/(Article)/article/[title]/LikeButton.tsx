import { Heart } from "lucide-react"
import { Session } from "next-auth"

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
}
export const LikeButton = ({ currentSlug, session }: LikeButtonProps) => {
  const { data: likesData, refetch: getArticleLikes } =
    trpc.blogRouter.getArticleLikeData.useQuery(
      { slug: currentSlug, session },
      {
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
      }
    )
  const { mutateAsync: updateLikeCount } =
    trpc.blogRouter.updateArticleLikes.useMutation({
      onSuccess: () => {
        getArticleLikes()
      },
    })

  const onLikeArticle = async () => {
    await updateLikeCount({ session, slug: currentSlug })
  }
  return (
    <div className="flex items-center">
      <Popover>
        {session ? (
          <Button variant="ghost" size="icon" onClick={onLikeArticle}>
            <Heart fill={likesData?.fill ?? "none"} />
          </Button>
        ) : (
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon">
              <Heart fill={likesData?.fill ?? "none"} />
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
