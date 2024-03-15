import { useState } from "react"
import { debounce } from "lodash"
import { Heart } from "lucide-react"

import { LikeData } from "@/types/blog"
import { Button } from "@/components/ui/button"
import { trpc } from "@/app/_trpc/client"

import { CommentProps } from "./Comment"

interface CommentLikeButtonProps extends CommentProps {}

export const CommentLikeButton = ({ comment }: CommentLikeButtonProps) => {
  const articleLiked = comment.likes.filter(
    (currentLike) => currentLike.userId === session?.user.id
  ).length

  const [likesData, setLikesData] = useState<LikeData>({
    likes: comment.likes.length,
    isLiked: !!articleLiked,
  })

  const { data: session } = trpc.authRouter.getSession.useQuery(undefined, {
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  })

  const { refetch: invalidateCommentsData } =
    trpc.blogRouter.getCommentsData.useQuery(
      { slug: comment.articleSlug },
      {
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
      }
    )

  const { mutateAsync: updateLikeCount } =
    trpc.blogRouter.updateCommentLikes.useMutation({
      onMutate: () => {
        // optimistic update of like count
        if (likesData!.isLiked) {
          setLikesData((prev) => ({ isLiked: false, likes: prev!.likes - 1 }))
        } else {
          setLikesData((prev) => ({ isLiked: true, likes: prev!.likes + 1 }))
        }
      },
      onSuccess: () => {
        invalidateCommentsData()
      },
    })

  return (
    <div className="flex items-center">
      <Button
        variant="ghost"
        size="icon"
        onClick={debounce(async () => {
          // 250ms debounced used to prevent API overload
          await updateLikeCount({
            comment,
          })
        }, 250)}
      >
        <Heart fill={likesData?.isLiked ? "red" : "none"} />
      </Button>
      <div>{likesData?.likes ?? "--"}</div>
    </div>
  )
}
