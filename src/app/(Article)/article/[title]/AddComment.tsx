import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { UserAvatar } from "@/components/UserAvatar"

export const AddComment = () => {
  return (
    <Card className="bg-secondary mt-2 space-y-3 p-2">
      <UserAvatar />
      <Textarea />
      <div className="flex justify-end">
        <Button>Submit</Button>
      </div>
    </Card>
  )
}
