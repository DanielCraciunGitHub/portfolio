"use client";

import { useRef } from "react";
import { useParams } from "next/navigation";
import { siteConfig } from "@/config";
import { Share } from "lucide-react";
import CopyToClipboard from "react-copy-to-clipboard";

import { useKeybind } from "@/hooks/useKeybind";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

export const ShareButton = () => {
  const { title: currentSlug }: { title: string } = useParams();

  const buttonRef = useRef<HTMLButtonElement>(null);

  useKeybind(buttonRef, { key: "s", ctrlKey: true }, () =>
    buttonRef.current?.click()
  );

  return (
    <CopyToClipboard
      text={`${siteConfig.url}/article/${currentSlug}`}
      onCopy={() => {
        toast({
          title: "✅ Article Link Copied!",
          description: "Share this article with others!",
        });
      }}
    >
      <Button
        variant="ghost"
        className="group relative flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-primary/10 hover:text-primary"
        ref={buttonRef}
      >
        <Share className="size-4" />
        <span className="text-sm font-medium">Share</span>
      </Button>
    </CopyToClipboard>
  );
};
