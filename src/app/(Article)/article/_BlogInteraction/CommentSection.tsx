import { useEffect, useState } from "react"
import { useParams, useSearchParams } from "next/navigation"
import { MessageCircle } from "lucide-react"
import { useSession } from "next-auth/react"

import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import AuthButton from "@/components/Buttons/AuthButton"
import { trpc } from "@/app/_trpc/client"

import { AddComment } from "./AddComment"
import { Comment } from "./Comment"

export const CommentSection = () => {
  const { title: currentSlug }: { title: string } = useParams()

  const [open, setOpen] = useState(false)
  const [openedOnce, setOpenedOnce] = useState(false)

  const { data: session } = useSession()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (searchParams.get("id") != null) {
      setOpen(true)
    }
  }, [searchParams])

  const { data: comments } = trpc.blogRouter.getCommentsData.useQuery(
    { slug: currentSlug },
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      enabled: openedOnce,
    }
  )

  const topLevelComments = comments?.filter(
    (comment) => comment.parentId === null
  )

  return (
    <Sheet
      onOpenChange={() => {
        !openedOnce ? setOpenedOnce(true) : null
        setOpen(!open)
      }}
      open={open}
    >
      <SheetTrigger>
        <MessageCircle />
        <span className="sr-only">Open Comment Menu</span>
      </SheetTrigger>
      <SheetContent className="flex flex-col overflow-auto" side="right">
        {session ? (
          <div>
            <div className="text-lg font-bold">
              Responses({topLevelComments?.length ?? 0})
            </div>

            <AddComment />

            {/* Rendering comments and respective replies */}
            <div className="flex flex-col">
              {topLevelComments?.map((comment) => (
                <div key={comment.id} className="mt-4 space-y-2">
                  <Comment comment={comment} />

                  <div className="space-y-2 flex flex-col">
                    {comment.replies.map((reply) => (
                      <div
                        key={reply.id}
                        className="grid grid-cols-12 grid-rows-1"
                      >
                        <Separator
                          className="col-span-1 mx-auto w-2 bg-primary/50"
                          orientation="vertical"
                        />
                        <div className="col-span-11">
                          <Comment comment={reply} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
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
