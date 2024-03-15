import { ArticleComment, ArticleLike, User } from "@/types/blog"
import { formatTimeToNow, getInitials } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

import { CommentLikeButton } from "./CommentLikeButton"

export interface CommentProps {
  comment: ArticleComment & {
    author: User
    likes: ArticleLike[]
    replies: ArticleComment
  }
}

export const Comment = ({ comment }: CommentProps) => {
  // TODO: make sure the ml-4 is set for indented replies
  return (
    <Card key={comment.id} className={`mt-4 p-3`}>
      <div className="flex items-center space-x-2">
        <Avatar>
          <AvatarImage src={comment.author.image ?? undefined} />
          <AvatarFallback>{getInitials(comment.author.name!)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <div className="font-semibold text-sm">{comment.author.name}</div>
          <div className="text-muted-foreground text-xs">
            {formatTimeToNow(new Date(comment.updatedAt!))}
          </div>
        </div>
      </div>

      <div className="mt-4 border border-muted-foreground/20 rounded p-2">
        {comment.body}
      </div>
      <div className="flex justify-between items-center mt-2">
        <CommentLikeButton comment={comment} />
        <div>
          <Button>Reply</Button>
        </div>
      </div>
    </Card>
  )
}
