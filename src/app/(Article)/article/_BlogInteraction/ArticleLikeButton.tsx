import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/server/client";
import { debounce } from "lodash";
import { useSession } from "next-auth/react";
import { LikeHeart } from "src/app/(Article)/article/_BlogInteraction/LikeHeart";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent } from "@/components/ui/popover";
import AuthButton from "@/components/Buttons/AuthButton";
import { LoginModal } from "@/components/LoginModal";

export const ArticleLikeButton = () => {
  const { title: currentSlug }: { title: string } = useParams();

  const { data: session } = useSession();

  const { data, refetch: invalidateLikeData } =
    api.blogRouter.getArticleLikeData.useQuery(
      { slug: currentSlug },
      {
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
      }
    );
  const [likesData, setLikesData] = useState(data);
  useEffect(() => {
    setLikesData(data);
  }, [data]);

  const { mutateAsync: updateLikeCount } =
    api.blogRouter.updateArticleLikes.useMutation({
      onMutate: () => {
        // optimistic update of like count
        if (likesData!.isLiked) {
          setLikesData((prev) => ({
            isLiked: false,
            likes: prev!.likes - 1,
          }));
        } else {
          setLikesData((prev) => ({
            isLiked: true,
            likes: prev!.likes + 1,
          }));
        }
      },
      onSuccess: () => {
        invalidateLikeData();
      },
    });

  return (
    <div className="flex items-center">
      <Popover>
        {session ? (
          <Button
            variant="ghost"
            className="group relative flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-primary/10 hover:text-primary"
            onClick={debounce(async () => {
              // 250ms debounced used to prevent API overload
              await updateLikeCount({
                slug: currentSlug,
                isLiked: likesData!.isLiked,
              });
            }, 250)}
          >
            <LikeHeart isLiked={likesData?.isLiked} />
            <span className="text-sm font-medium">
              {likesData?.likes ?? "--"}
            </span>
          </Button>
        ) : (
          <LoginModal
            buttonNode={
              <Button
                variant="ghost"
                className="group relative flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-primary/10 hover:text-primary"
              >
                <LikeHeart isLiked={likesData?.isLiked} />
                <span className="text-sm font-medium">
                  {likesData?.likes ?? "--"}
                </span>
              </Button>
            }
          />
        )}
        <PopoverContent className="flex flex-col space-y-4 border-border/50 text-center">
          <Label>Login to like this article ❤️</Label>
          <AuthButton session={session} />
        </PopoverContent>
      </Popover>
    </div>
  );
};
