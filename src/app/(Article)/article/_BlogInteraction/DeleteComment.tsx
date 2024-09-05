import { useState } from "react"
import { api } from "@/server/client"

import type { Reply, TopComment } from "@/types/blog"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { SpinnerButton } from "@/components/Buttons/SpinnerButton"

interface DeleteCommentProps {
  comment: TopComment | Reply
}
export const DeleteComment = ({ comment }: DeleteCommentProps) => {
  const [open, setOpen] = useState(false)

  const { refetch: invalidateCommentsData } =
    api.blogRouter.getCommentsData.useQuery(
      { slug: comment.articleSlug },
      {
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
      }
    )
  const { mutateAsync: deleteComment, isPending } =
    api.blogRouter.deleteComment.useMutation({
      onSuccess: () => {
        invalidateCommentsData()
      },
    })

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="border-muted-foreground/20">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <SpinnerButton
            className="bg-destructive text-foreground hover:bg-destructive"
            name="Delete"
            state={isPending}
            onClick={async () => {
              // TODO make sure the spinner button shows
              await deleteComment({ comment })
              setOpen(false)
            }}
          />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
