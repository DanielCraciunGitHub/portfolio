"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"
import { useForm } from "react-hook-form"
import type { z } from "zod"

import { contactFormSchema } from "@/lib/validations/form"
import { Form } from "@/components/ui/form"
import InputField from "@/components/InputField"
import { SpinnerButton } from "@/components/SpinnerButton"
import { captchaVerification, receiveEmail } from "@/app/_actions/form"

type Inputs = z.infer<typeof contactFormSchema>

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const { executeRecaptcha } = useGoogleReCaptcha()

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
    setIsSubmitting(true)

    try {
      const token = await executeRecaptcha()

      const res = await captchaVerification(token)

      if (!res.ok) {
        throw new Error("Failed Verification! Please try again later.")
      }

      const feedbackRes = await receiveEmail(values)

      if (!feedbackRes.ok) {
        if (feedbackRes.code === 429) {
          throw new Error("You can only send feedback once every hour.")
        } else {
          throw new Error("Failed to send email! Please try again later.")
        }
      }

      toast({
        title: "Success",
        description:
          "We appreciate you taking your time to fill in this form, we will get back to you shortly.",
      })
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      })
    } finally {
      form.reset()
      setIsSubmitting(false)
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-2/3 flex-col justify-center space-y-8"
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
        <SpinnerButton name="Send" state={isSubmitting} type="submit" />
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
