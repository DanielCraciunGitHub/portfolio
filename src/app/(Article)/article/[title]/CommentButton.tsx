import { MessageCircle } from "lucide-react"
import { Session } from "next-auth"

import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import AuthButton from "@/components/AuthButton"

interface CommentButtonProps {
  currentSlug: string
  session: Session | null
}
export const CommentButton = ({ currentSlug, session }: CommentButtonProps) => {
  return (
    <Sheet>
      <SheetTrigger>
        <MessageCircle />
        <span className="sr-only">Open Comment Menu</span>
      </SheetTrigger>
      <SheetContent className="flex flex-col items-center" side="right">
        {session ? (
          <div>Comments are currently Disabled ⛔</div>
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
