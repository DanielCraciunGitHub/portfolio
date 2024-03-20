import { useState } from "react"
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
  const [isReplying, setIsReplying] = useState(false)

  const { data: session } = useSession()

  return (
    <Card key={comment.id} className={`p-3 w-full`}>
      <div className="flex justify-between">
        <div className="flex items-center space-x-2 overflow-x-auto">
          <Avatar>
            <AvatarImage src={comment.author.image ?? undefined} />
            <AvatarFallback>{getInitials(comment.author.name!)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <div className="font-semibold md:text-sm text-xs">
              {comment.author.name}
            </div>
            <div className="text-muted-foreground text-xs">
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
            <PopoverContent className="flex flex-col space-y-2 w-fit border-none">
              <EditComment defaultValue={comment.body!} comment={comment} />
              <DeleteComment comment={comment} />
            </PopoverContent>
          </Popover>
        ) : null}
      </div>

      <div className="mt-3 space-y-1">
        <div className="text-blue-500 text-sm">
          {comment.replyingTo ? `@${comment.replyingTo}` : null}
        </div>

        <Textarea
          className="rounded p-2 resize-none disabled:opacity-100 disabled:cursor-auto"
          value={comment.body!}
          disabled
          rows={5}
        />
      </div>

      <div className="flex justify-between items-center mt-2">
        <CommentLikeButton comment={comment} />
        {/* Reply Button */}
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
