import { useParams } from "next/navigation";
import { siteConfig } from "@/config";
import { Share } from "lucide-react";
import CopyToClipboard from "react-copy-to-clipboard";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

export const ShareButton = () => {
  const { title: currentSlug }: { title: string } = useParams();

  return (
    <CopyToClipboard
      text={`${siteConfig.url}/article/${currentSlug}`}
      onCopy={() => {
        toast({
          title: "✅ Article Link Copied!",
        });
      }}
    >
      <Button variant="ghost">
        <Share />
      </Button>
    </CopyToClipboard>
  );
};
