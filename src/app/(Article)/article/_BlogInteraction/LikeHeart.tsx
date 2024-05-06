import { Heart } from "lucide-react"

interface LikeHeartProps {
  isLiked?: boolean
}

export const LikeHeart = ({ isLiked }: LikeHeartProps) => {
  return (
    <Heart
      className={
        isLiked
          ? "fill-red-600  transition transform duration-300 ease-out scale-125 opacity-100"
          : "transition transform duration-300 ease-out scale-100 opacity-50"
      }
    />
  )
}
