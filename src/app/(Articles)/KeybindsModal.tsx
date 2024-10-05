"use client"

import { Command } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

interface KeybindsModalProps {}

export const KeybindsModal = ({}: KeybindsModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="hidden rounded rounded-l-none rounded-r-lg border border-muted-foreground/50 bg-primary text-white sm:block"
        >
          <Command />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col items-center border-muted">
        <h1 className="border-b border-muted-foreground text-4xl font-extrabold">
          Shortcuts
        </h1>
        <ul className="list-disc">
          <li className="p-2">
            Dark Mode: <kbd className="rounded bg-muted p-1">Ctrl+Shift+L</kbd>
          </li>
          <li className="p-2">
            Back Navigation: <kbd className="rounded bg-muted p-1">←</kbd>
          </li>
          <li className="p-2">
            Search: <kbd className="rounded bg-muted p-1">/</kbd>
          </li>
          <li className="p-2">
            Comment Menu: <kbd className="rounded bg-muted p-1">Ctrl+M</kbd>
          </li>
          <li className="p-2">
            Share Article: <kbd className="rounded bg-muted p-1">Ctrl+S</kbd>
          </li>
        </ul>
      </DialogContent>
    </Dialog>
  )
}
