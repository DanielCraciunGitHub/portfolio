import { useParams } from "next/navigation"
import { MessageCircle } from "lucide-react"

import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import AuthButton from "@/components/AuthButton"
import { trpc } from "@/app/_trpc/client"

import { AddComment } from "./AddComment"
import { Comment } from "./Comment"

export const CommentSection = () => {
  const { title: currentSlug }: { title: string } = useParams()

  const { data: session } = trpc.authRouter.getSession.useQuery(undefined, {
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  })
  const { data: comments } = trpc.blogRouter.getCommentsData.useQuery(
    { slug: currentSlug },
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  )

  console.log(comments)

  return (
    <Sheet>
      <SheetTrigger>
        <MessageCircle />
        <span className="sr-only">Open Comment Menu</span>
      </SheetTrigger>
      <SheetContent className="flex flex-col overflow-auto" side="right">
        {session ? (
          <div>
            <div className="text-lg font-bold">
              Responses({comments?.length ?? 0})
            </div>

            <AddComment />

            <div className="flex flex-col">
              {comments?.map((comment) => (
                <Comment key={comment.id} comment={comment} />
              ))}
            </div>
          </div>
        ) : (
          <>
            <Label className="mt-4">Login to comment on this article ❤️</Label>
            <AuthButton session={session} />
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
