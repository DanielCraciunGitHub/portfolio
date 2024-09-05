import { useState } from "react"
import { api } from "@/server/client"
import { debounce } from "lodash"
import { useSession } from "next-auth/react"
import type { CommentProps } from "src/app/(Article)/article/_BlogInteraction/Comment"
import { LikeHeart } from "src/app/(Article)/article/_BlogInteraction/LikeHeart"

import { Button } from "@/components/ui/button"

interface CommentLikeButtonProps extends CommentProps {}

export const CommentLikeButton = ({ comment }: CommentLikeButtonProps) => {
  const { data: session } = useSession()

  const articleLiked = comment.likes.filter(
    (currentLike) => currentLike.userId === session?.user.id
  ).length

  const [likesData, setLikesData] = useState({
    likes: comment.likes.length,
    isLiked: !!articleLiked,
  })

  const { refetch: invalidateCommentsData } =
    api.blogRouter.getCommentsData.useQuery(
      { slug: comment.articleSlug },
      {
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
      }
    )

  const { mutateAsync: updateLikeCount } =
    api.blogRouter.updateCommentLikes.useMutation({
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
        <LikeHeart isLiked={likesData?.isLiked} />
      </Button>
      <div>{likesData?.likes ?? "--"}</div>
    </div>
  )
}
