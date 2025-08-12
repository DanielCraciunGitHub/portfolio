"use client";

import { Command } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

export const KeybindsModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="default"
          size="icon"
          className="rounded-l-none rounded-r-lg border border-l-0 border-border bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Command className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <div className="flex flex-col space-y-6 text-center">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Keyboard Shortcuts</h2>
            <p className="text-muted-foreground">
              Use these shortcuts to navigate quickly
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
              <span className="font-medium">Search</span>
              <kbd className="rounded-md border bg-background px-3 py-1 font-mono text-sm">
                /
              </kbd>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
              <span className="font-medium">Dark Mode</span>
              <div className="flex gap-1">
                <kbd className="rounded-md border bg-background px-2 py-1 font-mono text-xs">
                  Ctrl
                </kbd>
                <span className="text-muted-foreground">+</span>
                <kbd className="rounded-md border bg-background px-2 py-1 font-mono text-xs">
                  Shift
                </kbd>
                <span className="text-muted-foreground">+</span>
                <kbd className="rounded-md border bg-background px-2 py-1 font-mono text-xs">
                  L
                </kbd>
              </div>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
              <span className="font-medium">Back Navigation</span>
              <kbd className="rounded-md border bg-background px-3 py-1 font-mono text-sm">
                ←
              </kbd>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
              <span className="font-medium">Comment Menu</span>
              <div className="flex gap-1">
                <kbd className="rounded-md border bg-background px-2 py-1 font-mono text-xs">
                  Ctrl
                </kbd>
                <span className="text-muted-foreground">+</span>
                <kbd className="rounded-md border bg-background px-2 py-1 font-mono text-xs">
                  M
                </kbd>
              </div>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
              <span className="font-medium">Share Article</span>
              <div className="flex gap-1">
                <kbd className="rounded-md border bg-background px-2 py-1 font-mono text-xs">
                  Ctrl
                </kbd>
                <span className="text-muted-foreground">+</span>
                <kbd className="rounded-md border bg-background px-2 py-1 font-mono text-xs">
                  S
                </kbd>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
