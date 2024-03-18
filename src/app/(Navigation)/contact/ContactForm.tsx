"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"
import { useForm } from "react-hook-form"
import type { z } from "zod"

import { contactFormSchema } from "@/lib/validations/form"
import { Form } from "@/components/ui/form"
import { SpinnerButton } from "@/components/Buttons/SpinnerButton"
import InputField from "@/components/InputField"
import { trpc } from "@/app/_trpc/client"

type Inputs = z.infer<typeof contactFormSchema>

const ContactForm = () => {
  const { executeRecaptcha } = useGoogleReCaptcha()

  const {
    mutateAsync: receiveEmail,
    isError,
    error,
    isLoading,
  } = trpc.contactRouter.receiveEmail.useMutation({})

  const form = useForm<Inputs>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      email: "",
      message: "",
    },
  })

  async function onSubmit(values: Inputs) {
    if (!executeRecaptcha) {
      return
    }

    const { toast } = await import("@/components/ui/use-toast")

    try {
      await receiveEmail({ ...values, token: await executeRecaptcha() })

      if (isError) {
        throw new Error(error.message)
      }

      toast({
        title: "Success",
        description:
          "Thank you for contacting me. I will get back to you shortly.",
      })
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      })
    } finally {
      form.reset()
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex sm:w-2/3 w-full flex-col justify-center space-y-8"
      >
        <InputField
          name="email"
          label="Email"
          placeholder="johndoe@gmail.com"
          control={form.control}
        />
        <InputField
          name="message"
          label="Message"
          type="textarea"
          placeholder="Message..."
          control={form.control}
        />
        <GoogleNotice />
        <SpinnerButton name="Send" state={isLoading} type="submit" />
      </form>
    </Form>
  )
}

const GoogleNotice = () => {
  return (
    <div>
      This site is protected by reCAPTCHA and the Google{" "}
      <a
        href="https://policies.google.com/privacy"
        className="text-blue-600 underline"
      >
        Privacy Policy
      </a>{" "}
      and{" "}
      <a
        href="https://policies.google.com/terms"
        className="text-blue-600 underline"
      >
        Terms of Service
      </a>{" "}
      apply.
    </div>
  )
}

export default ContactForm
