"use client"

import type { ReactNode } from "react"
import { Google } from "src/components/SVG/Google"
import { Button } from "src/components/ui/button"
import { Separator } from "src/components/ui/separator"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { authenticate } from "@/app/_actions/authenticate"
import { BackgroundImage } from "@/app/(Articles)/blog/BackgroundImage"

interface LoginModalProps {
  buttonNode: ReactNode
}

export const LoginModal = ({ buttonNode }: LoginModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{buttonNode}</DialogTrigger>
      <DialogContent className="flex flex-col border-muted">
        <BackgroundImage className="rounded-md opacity-30" />
        <DialogHeader>
          <DialogTitle className="text-4xl font-bold">Login</DialogTitle>
          <DialogDescription className="text-lg">
            Join Info Library Today!
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <Button
          variant="secondary"
          className="space-x-2"
          onClick={() => authenticate()}
        >
          <Google />
          <span>Sign In with Google</span>
        </Button>
      </DialogContent>
    </Dialog>
  )
}
