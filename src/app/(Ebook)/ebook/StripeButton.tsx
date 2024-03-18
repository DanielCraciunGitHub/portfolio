"use client"

import { useRouter } from "next/navigation"

import { ButtonProps } from "@/components/ui/button"
import { SpinnerButton } from "@/components/Buttons/SpinnerButton"
import { trpc } from "@/app/_trpc/client"

interface StripeButtonProps extends ButtonProps {
  name: string
}

const StripeButton = ({ className, name }: StripeButtonProps) => {
  const router = useRouter()
  const { refetch: getStripeUrl, isFetching } =
    trpc.paymentRouter.getStripeUrl.useQuery(undefined, {
      enabled: false,
    })

  const onSubmit = async () => {
    const { data: url } = await getStripeUrl()

    if (url) {
      router.push(url)
    } else {
      router.refresh()
    }
  }
  return (
    <SpinnerButton
      type="submit"
      onClick={onSubmit}
      className={className}
      state={isFetching}
      name={name}
    />
  )
}

export default StripeButton
