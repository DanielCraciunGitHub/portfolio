import { Loader2 } from "lucide-react"

import type { ButtonProps } from "@/components/ui/button"
import { Button } from "@/components/ui/button"

interface SpinnerButtonProps extends ButtonProps {
  state: boolean
  name: string
}

export const SpinnerButton = ({
  state,
  name,
  ...props
}: SpinnerButtonProps) => {
  return (
    <Button {...props}>
      {state ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <span>{name}</span>
      )}
    </Button>
  )
}
