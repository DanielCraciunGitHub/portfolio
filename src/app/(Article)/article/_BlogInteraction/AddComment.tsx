import type { Dispatch, SetStateAction } from "react"
import { useParams } from "next/navigation"
import { siteConfig } from "@/config"
import { api } from "@/server/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import type { z } from "zod"

import type { Reply, TopComment } from "@/types/blog"
import { articleCommentSchema } from "@/lib/validations/form"
import { usePersistComment } from "@/hooks/usePersistComment"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { SpinnerButton } from "@/components/Buttons/SpinnerButton"
import InputField from "@/components/InputField"
import { UserAvatar } from "@/components/UserAvatar"
import { sendReplyEmail } from "@/app/_actions/email"

type Inputs = z.infer<typeof articleCommentSchema>

const FORM_DATA_KEY = "comment_form_data"

interface AddCommentProps {
  setIsReplying?: Dispatch<SetStateAction<boolean>>
  replyingTo?: TopComment | Reply
}

export const AddComment = ({ setIsReplying, replyingTo }: AddCommentProps) => {
  const { title: slug }: { title: string } = useParams()
  const { data: session } = useSession()

  const form = useForm<Inputs>({
    resolver: zodResolver(articleCommentSchema),
    defaultValues: {
      body: getSavedBody(),
    },
  })

  const body = form.watch("body")
  usePersistComment({ value: body, key: FORM_DATA_KEY })

  const { refetch: invalidateCommentsData } =
    api.blogRouter.getCommentsData.useQuery(
      { slug },
      {
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
      }
    )
  const { mutateAsync: addComment, isPending } =
    api.blogRouter.addComment.useMutation({
      onSuccess: async () => {
        await invalidateCommentsData()
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        setIsReplying ? setIsReplying(false) : null
      },
    })
  async function onSubmit({ body }: Inputs) {
    form.reset({ body: "" })

    // If the reply is for a top-level comment
    if (replyingTo && Object.hasOwn(replyingTo as object, "replies")) {
      const { newCommentId } = await addComment({
        body,
        slug,
        replyingToId: replyingTo.id,
      })
      await sendReplyEmail({
        body,
        commentLink: `${siteConfig.url}/article/${slug}?id=${newCommentId}`,
        senderName: session ? session.user.name! : "Anonymous",
        receiverEmail: replyingTo.author.email,
      })
    } else if (replyingTo) {
      // If the reply is a sub-reply
      const { newCommentId } = await addComment({
        body,
        slug,
        replyingToId: replyingTo.parentId!,
        replyingTo: replyingTo.author.name!,
      })
      await sendReplyEmail({
        body,
        commentLink: `${siteConfig.url}/article/${slug}?id=${newCommentId}`,
        senderName: session ? session.user.name! : "Anonymous",
        receiverEmail: replyingTo.author.email,
      })
    } else {
      // If this is a top level comment and not a reply
      await addComment({ body, slug })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="mt-2 space-y-3 bg-secondary p-2">
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
            <SpinnerButton name="Submit" state={isPending} type="submit" />
          </div>
        </Card>
      </form>
    </Form>
  )
}
const getSavedBody = () => {
  const data = localStorage.getItem(FORM_DATA_KEY)
  if (data) {
    try {
      return JSON.parse(data)
    } catch (err) {
      /* empty catch */
    }
  }
  return ""
}
