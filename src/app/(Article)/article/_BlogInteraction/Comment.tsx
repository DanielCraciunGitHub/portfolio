import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { EllipsisVertical } from "lucide-react"
import { useSession } from "next-auth/react"

import { Reply, TopComment } from "@/types/blog"
import { formatTimeToNow, getInitials } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"

import { AddComment } from "./AddComment"
import { CommentLikeButton } from "./CommentLikeButton"
import { DeleteComment } from "./DeleteComment"
import { EditComment } from "./EditComment"

export interface CommentProps {
  comment: TopComment | Reply
}

export const Comment = ({ comment }: CommentProps) => {
  const searchParams = useSearchParams()
  const [isReplying, setIsReplying] = useState(false)

  const { data: session } = useSession()

  return (
    <Card
      key={comment.id}
      className={`w-full p-3 ${comment.id === searchParams.get("id") ? "bg-destructive" : ""}`}
    >
      <div className="flex justify-between">
        <div className="flex items-center space-x-2 overflow-x-auto">
          <Avatar>
            <AvatarImage src={comment.author.image ?? undefined} />
            <AvatarFallback>{getInitials(comment.author.name!)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <div className="text-xs font-semibold md:text-sm">
              {comment.author.name}
            </div>
            <div className="text-xs text-muted-foreground">
              {!comment.isEdited
                ? formatTimeToNow(new Date(comment.updatedAt!))
                : `${formatTimeToNow(new Date(comment.updatedAt!))} (edited)`}
            </div>
          </div>
        </div>

        {session?.user.id === comment.author.id ? (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="hover:bg-inherit">
                <EllipsisVertical />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="flex w-fit flex-col space-y-2 border-none">
              <EditComment defaultValue={comment.body!} comment={comment} />
              <DeleteComment comment={comment} />
            </PopoverContent>
          </Popover>
        ) : null}
      </div>

      <div className="mt-3 space-y-1">
        <div className="text-sm text-blue-500">
          {comment.replyingTo ? `@${comment.replyingTo}` : null}
        </div>

        <Textarea
          className="resize-none rounded p-2 disabled:cursor-auto disabled:opacity-100"
          value={comment.body!}
          disabled
          rows={5}
        />
      </div>

      <div className="mt-2 flex items-center justify-between">
        <CommentLikeButton comment={comment} />
        <Button
          onClick={() => {
            setIsReplying(true)
          }}
        >
          Reply
        </Button>
      </div>
      {isReplying ? (
        <AddComment setIsReplying={setIsReplying} replyingTo={comment} />
      ) : null}
    </Card>
  )
}
