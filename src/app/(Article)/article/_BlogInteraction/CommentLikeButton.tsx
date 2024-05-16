import { useState } from "react";
import { debounce } from "lodash";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { trpc } from "@/app/_trpc/client";

import { CommentProps } from "./Comment";
import { LikeHeart } from "./LikeHeart";

interface CommentLikeButtonProps extends CommentProps {}

export const CommentLikeButton = ({ comment }: CommentLikeButtonProps) => {
  const { data: session } = useSession();

  const articleLiked = comment.likes.filter(
    (currentLike) => currentLike.userId === session?.user.id,
  ).length;

  const [likesData, setLikesData] = useState({
    likes: comment.likes.length,
    isLiked: !!articleLiked,
  });

  const { refetch: invalidateCommentsData } =
    trpc.blogRouter.getCommentsData.useQuery(
      { slug: comment.articleSlug },
      {
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
      },
    );

  const { mutateAsync: updateLikeCount } =
    trpc.blogRouter.updateCommentLikes.useMutation({
      onMutate: () => {
        // optimistic update of like count
        if (likesData!.isLiked) {
          setLikesData((prev) => ({ isLiked: false, likes: prev!.likes - 1 }));
        } else {
          setLikesData((prev) => ({ isLiked: true, likes: prev!.likes + 1 }));
        }
      },
      onSuccess: () => {
        invalidateCommentsData();
      },
    });

  return (
    <div className="flex items-center">
      <Button
        variant="ghost"
        size="icon"
        onClick={debounce(async () => {
          // 250ms debounced used to prevent API overload
          await updateLikeCount({
            comment,
          });
        }, 250)}
      >
        <LikeHeart isLiked={likesData?.isLiked} />
      </Button>
      <div>{likesData?.likes ?? "--"}</div>
    </div>
  );
};
