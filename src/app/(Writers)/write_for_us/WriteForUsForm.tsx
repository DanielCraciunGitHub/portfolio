"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { writeForUsFormSchema } from "@/lib/validations/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "@/components/InputField";
import { Card } from "@/components/ui/card";
import { SpinnerButton } from "@/components/Buttons/SpinnerButton";
import { Switch } from "@/components/ui/switch";
import { sendWriterSubmission } from "@/app/_actions/discord";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";

type Inputs = z.infer<typeof writeForUsFormSchema>;

interface WriteForUsFormProps {}

export const WriteForUsForm = ({}: WriteForUsFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<Inputs>({
    resolver: zodResolver(writeForUsFormSchema),
    defaultValues: {
      email: "",
      articleLink: "",
      discord: "",
      profilePicturePermission: false,
      namePermission: true,
      otherDetails: "",
    },
  });

  async function onSubmit(values: Inputs) {
    try {
      setIsLoading(true);
      await sendWriterSubmission(values);
      toast({
        title: "Success",
        description:
          "Thank you for contacting me. I will get back to you shortly.",
      });
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      form.reset();
      setIsLoading(false);
    }
  }

  return (
    <Card className="container mb-10 mt-8 max-w-xl space-y-2 p-4">
      <h1 className="container text-center text-2xl font-bold tracking-tight md:text-3xl xl:text-4xl">
        Submit Your Article
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="container flex flex-col justify-center space-y-8"
        >
          <FormDescription className="text-center">
            And we will take care of the rest.
          </FormDescription>

          <div className="flex flex-col justify-between space-y-2 md:flex-row md:space-x-3 md:space-y-0">
            <InputField
              name="discord"
              label="Discord*"
              placeholder="johndoe_21"
              control={form.control}
              className="w-full"
            />
            <InputField
              name="email"
              label="Email"
              placeholder="johndoe@gmail.com"
              control={form.control}
              className="w-full"
            />
          </div>

          <InputField
            name="articleLink"
            label="Article Link*"
            placeholder="https://example.com/article/xyz"
            control={form.control}
          />

          <FormField
            control={form.control}
            name="namePermission"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border border-muted p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Name Permission</FormLabel>
                  <FormDescription>
                    We will use "Anonymous" otherwise.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="profilePicturePermission"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border border-muted p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">
                    Profile Picture Permission
                  </FormLabel>
                  <FormDescription>
                    Your initials will be used otherwise.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <InputField
            name="otherDetails"
            label="Additional Details"
            type="textarea"
            placeholder="Extra Requirements, Questions..."
            control={form.control}
          />

          <SpinnerButton name="Send" state={isLoading} type="submit" />
        </form>
      </Form>
    </Card>
  );
};
