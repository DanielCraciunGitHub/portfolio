"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode } from "react";
import { Button } from "./ui/button";
import { Google } from "./SVG/Google";
import { Separator } from "./ui/separator";
import { BackgroundImage } from "@/app/(Articles)/blog/BackgroundImage";
import { authenticate } from "@/app/_actions/authenticate";

interface LoginModalProps {
  buttonNode: ReactNode;
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
  );
};
