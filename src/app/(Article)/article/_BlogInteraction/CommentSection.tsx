import { useEffect, useRef, useState } from "react"
import { useParams, useSearchParams } from "next/navigation"
import { trpc } from "@/server/client"
import { MessageCircle } from "lucide-react"
import { useSession } from "next-auth/react"

import { useKeybind } from "@/hooks/useKeybind"
import { Button, buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { LoginModal } from "@/components/LoginModal"

import { AddComment } from "./AddComment"
import { Comment } from "./Comment"

export const CommentSection = () => {
  const { title: currentSlug }: { title: string } = useParams()

  const [open, setOpen] = useState(false)
  const [openedOnce, setOpenedOnce] = useState(false)

  const { data: session } = useSession()
  const searchParams = useSearchParams()

  const buttonRef = useRef<HTMLButtonElement>(null)

  useKeybind(buttonRef, { key: "m", ctrlKey: true }, () => setOpen(!open))

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
      {!session ? (
        <LoginModal
          buttonNode={
            <Button variant="ghost">
              <MessageCircle />
              <span className="sr-only">Open Comment Menu</span>
            </Button>
          }
        />
      ) : (
        <SheetTrigger className={buttonVariants({ variant: "ghost" })}>
          <MessageCircle />
          <span className="sr-only">Open Comment Menu</span>
        </SheetTrigger>
      )}
      <SheetContent
        onClick={() => console.log("clicked")}
        className="flex flex-col overflow-auto"
        side="right"
      >
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

                <div className="flex flex-col space-y-2">
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
      </SheetContent>
    </Sheet>
  )
}
