import { useState } from "react"
import { api } from "@/server/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Reply, TopComment } from "@/types/blog"
import { articleCommentSchema } from "@/lib/validations/form"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { SpinnerButton } from "@/components/Buttons/SpinnerButton"

interface EditCommentProps {
  defaultValue: string
  comment: TopComment | Reply
}
type Inputs = z.infer<typeof articleCommentSchema>

//const textareaRef = useRef<ElementRef<"textarea">>(null)

//   const focusAndSetCursor = () => {
//     console.log(textareaRef.current)
//     if (textareaRef.current) {
//       textareaRef.current.focus()

//       textareaRef.current.selectionStart = textareaRef.current.value.length
//     }
// }
export const EditComment = ({ defaultValue, comment }: EditCommentProps) => {
  const [open, setOpen] = useState(false)

  const form = useForm<Inputs>({
    resolver: zodResolver(articleCommentSchema),
    defaultValues: {
      body: defaultValue,
    },
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
  const { mutateAsync: editComment, isLoading } =
    api.blogRouter.editComment.useMutation({
      onSuccess: async () => {
        await invalidateCommentsData()
        setOpen(false)
      },
    })

  async function onSubmit({ body }: Inputs) {
    await editComment({ body, comment })
  }
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="secondary">Edit</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="border-none">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      className="resize-none"
                      placeholder="Your Thoughts..."
                      rows={5}
                      autoFocus
                      onKeyDown={async (event) => {
                        if (event.key === "Enter" && event.ctrlKey) {
                          event.preventDefault()
                          await onSubmit({ body: field.value })
                        }
                      }}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>

              <SpinnerButton name="Confirm" state={isLoading} type="submit" />
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  )
}
