import { Heart } from "lucide-react"

interface LikeHeartProps {
  isLiked?: boolean
}

export const LikeHeart = ({ isLiked }: LikeHeartProps) => {
  return (
    <Heart
      className={`
        ${
          isLiked
            ? "scale-125  fill-red-600 opacity-100 transition duration-300 ease-out"
            : "scale-100 opacity-50 transition duration-300 ease-out"
        }
        `}
    />
  )
}
