import { MessageCircle } from "lucide-react"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export const CommentButton = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <MessageCircle />
        <span className="sr-only">Open Comment Menu</span>
      </SheetTrigger>
      <SheetContent className="flex flex-col items-center" side="right">
        <div>render comments here</div>
      </SheetContent>
    </Sheet>
  )
}
