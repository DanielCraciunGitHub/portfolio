import { Dispatch, SetStateAction } from "react";
import { useParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Reply, TopComment } from "@/types/blog";
import { articleCommentSchema } from "@/lib/validations/form";
import { usePersistComment } from "@/hooks/usePersistComment";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { SpinnerButton } from "@/components/Buttons/SpinnerButton";
import InputField from "@/components/InputField";
import { UserAvatar } from "@/components/UserAvatar";
import { trpc } from "@/app/_trpc/client";

type Inputs = z.infer<typeof articleCommentSchema>;

const FORM_DATA_KEY = "comment_form_data";

interface AddCommentProps {
  setIsReplying?: Dispatch<SetStateAction<boolean>>;
  replyingTo?: TopComment | Reply;
}

export const AddComment = ({ setIsReplying, replyingTo }: AddCommentProps) => {
  const { title: slug }: { title: string } = useParams();

  const form = useForm<Inputs>({
    resolver: zodResolver(articleCommentSchema),
    defaultValues: {
      body: getSavedBody(),
    },
  });

  const body = form.watch("body");
  usePersistComment({ value: body, key: FORM_DATA_KEY });

  const { refetch: invalidateCommentsData } =
    trpc.blogRouter.getCommentsData.useQuery(
      { slug },
      {
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
      },
    );
  const { mutateAsync: addComment, isLoading } =
    trpc.blogRouter.addComment.useMutation({
      onSuccess: async () => {
        await invalidateCommentsData();
        setIsReplying ? setIsReplying(false) : null;
      },
    });
  async function onSubmit({ body }: Inputs) {
    form.reset({ body: "" });

    // If the reply is for a top-level comment
    if (replyingTo && Object.hasOwn(replyingTo as object, "replies")) {
      await addComment({ body, slug, replyingToId: replyingTo.id });
    } else if (replyingTo) {
      // If the reply is a sub-reply
      await addComment({
        body,
        slug,
        replyingToId: replyingTo.parentId!,
        replyingTo: replyingTo.author.name!,
      });
    } else {
      // If this is a top level comment and not a reply
      await addComment({ body, slug });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="mt-2 space-y-3 bg-secondary p-2">
          <UserAvatar />
          <InputField
            name="body"
            type="textarea"
            placeholder="Your Thoughts..."
            control={form.control}
            defaultValue=""
          />
          <div className="flex justify-end space-x-4">
            {setIsReplying ? (
              <Button
                variant="destructive"
                onClick={() => (setIsReplying ? setIsReplying(false) : null)}
              >
                Cancel
              </Button>
            ) : null}
            <SpinnerButton name="Submit" state={isLoading} type="submit" />
          </div>
        </Card>
      </form>
    </Form>
  );
};
const getSavedBody = () => {
  const data = localStorage.getItem(FORM_DATA_KEY);
  if (data) {
    try {
      return JSON.parse(data);
    } catch (err) {
      console.error("Error parsing saved data:", err);
    }
  }
  return "";
};
