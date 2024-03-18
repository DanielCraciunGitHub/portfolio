import { Dispatch, SetStateAction } from "react"
import { useParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { FullComment, Reply } from "@/types/blog"
import { articleCommentSchema } from "@/lib/validations/form"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { SpinnerButton } from "@/components/Buttons/SpinnerButton"
import InputField from "@/components/InputField"
import { UserAvatar } from "@/components/UserAvatar"
import { trpc } from "@/app/_trpc/client"

type Inputs = z.infer<typeof articleCommentSchema>

interface AddCommentProps {
  setIsReplying?: Dispatch<SetStateAction<boolean>>
  replyingTo?: FullComment | Reply
}

export const AddComment = ({ setIsReplying, replyingTo }: AddCommentProps) => {
  const { title: slug }: { title: string } = useParams()

  const form = useForm<Inputs>({
    resolver: zodResolver(articleCommentSchema),
    defaultValues: {
      body: "",
    },
  })

  const { refetch: invalidateCommentsData } =
    trpc.blogRouter.getCommentsData.useQuery(
      { slug },
      {
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
      }
    )
  const { mutateAsync: addComment, isLoading } =
    trpc.blogRouter.addComment.useMutation({
      onSuccess: async () => {
        await invalidateCommentsData()
        setIsReplying ? setIsReplying(false) : null
      },
    })
  async function onSubmit({ body }: Inputs) {
    form.reset()

    // If the reply is for a top-level comment
    if (replyingTo && Object.hasOwn(replyingTo as object, "replies")) {
      console.log("full comment")
      await addComment({ body, slug, replyingTo: replyingTo.id })
    } else if (replyingTo) {
      // If the reply is for another reply
      await addComment({
        body: `@${replyingTo.author.name}: ${body}`,
        slug,
        replyingTo: replyingTo.parentId!,
      })
    } else {
      // If this is a top level comment and not a reply
      await addComment({ body, slug })
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="bg-secondary mt-2 space-y-3 p-2">
          <UserAvatar />
          <InputField
            name="body"
            type="textarea"
            placeholder="Your Thoughts..."
            control={form.control}
            defaultValue=""
          />
          <div className="flex justify-end space-x-4">
            {setIsReplying ? (
              <Button
                variant="destructive"
                onClick={() => (setIsReplying ? setIsReplying(false) : null)}
              >
                Cancel
              </Button>
            ) : null}
            <SpinnerButton name="Submit" state={isLoading} type="submit" />
          </div>
        </Card>
      </form>
    </Form>
  )
}
