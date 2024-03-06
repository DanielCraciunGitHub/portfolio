import { siteConfig } from "@/config"
import { Share } from "lucide-react"
import CopyToClipboard from "react-copy-to-clipboard"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

interface ShareButtonProps {
  currentSlug: string
}
export const ShareButton = ({ currentSlug }: ShareButtonProps) => {
  return (
    <CopyToClipboard
      text={`${siteConfig.url}/article/${currentSlug}`}
      onCopy={() => {
        toast({
          title: "✅ Article Link Copied!",
        })
      }}
    >
      <Button variant="ghost">
        <Share />
      </Button>
    </CopyToClipboard>
  )
}
