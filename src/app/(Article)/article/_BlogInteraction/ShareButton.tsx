"use client"

import { useRef } from "react"
import { useParams } from "next/navigation"
import { siteConfig } from "@/config"
import { Share } from "lucide-react"
import CopyToClipboard from "react-copy-to-clipboard"

import { useKeybind } from "@/hooks/useKeybind"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

export const ShareButton = () => {
  const { title: currentSlug }: { title: string } = useParams()

  const buttonRef = useRef<HTMLButtonElement>(null)

  useKeybind(buttonRef, { key: "s", ctrlKey: true }, () =>
    buttonRef.current?.click()
  )

  return (
    <CopyToClipboard
      text={`${siteConfig.url}/article/${currentSlug}`}
      onCopy={() => {
        toast({
          title: "✅ Article Link Copied!",
        })
      }}
    >
      <Button
        variant="ghost"
        className="hover:bg-inherit hover:text-inherit"
        ref={buttonRef}
      >
        <Share />
      </Button>
    </CopyToClipboard>
  )
}
