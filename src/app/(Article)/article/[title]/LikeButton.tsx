import { useState } from "react"
import { Heart } from "lucide-react"

import { Button } from "@/components/ui/button"

interface LikeButtonProps {
  currentSlug: string
}
export const LikeButton = ({ currentSlug }: LikeButtonProps) => {
  const defaultFill = "none"
  const [fill, setFill] = useState<string>(defaultFill)

  const handleButtonPress = () => {
    // fetch initial state (if liked previously)

    if (fill === defaultFill) {
      setFill("red")
      // increment
    } else {
      setFill(defaultFill)
      // decrement
    }
  }
  return (
    <div className="flex items-center">
      <Button variant="ghost" size="icon" onClick={handleButtonPress}>
        <Heart fill={fill} />
      </Button>
      <div>1000</div>
    </div>
  )
}
