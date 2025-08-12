import { Heart } from "lucide-react";

interface LikeHeartProps {
  isLiked?: boolean;
}

export const LikeHeart = ({ isLiked }: LikeHeartProps) => {
  return (
    <Heart
      className={`size-4 transition-all duration-300 ease-out ${
        isLiked
          ? "scale-110 fill-red-500 text-red-500"
          : "scale-100 text-muted-foreground group-hover:text-primary"
      }`}
    />
  );
};
