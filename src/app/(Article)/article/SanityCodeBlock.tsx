"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import type { CodeInputValue } from "@sanity/code-input";
import { Clipboard, ClipboardCheck } from "lucide-react";
import CopyToClipboard from "react-copy-to-clipboard";
import { gruvboxDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

import useLazyLoad from "@/hooks/useLazyLoad";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const SyntaxHighlighter = dynamic(
  () => import("react-syntax-highlighter"),
  {
    ssr: false,
  }
);

interface CodeBlockProps {
  value: CodeInputValue;
}
export function CodeBlock({ value }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const isSyntaxHighlighterLoaded = useLazyLoad(
    () => import("react-syntax-highlighter")
  );

  return (
    <div className="flex flex-col space-y-0 rounded-sm">
      <CopyToClipboard text={value.code!} onCopy={() => setCopied(true)}>
        <div className="flex w-full justify-end rounded-t-sm bg-muted-foreground/50">
          <Button variant="ghost" className="hover:bg-inherit">
            {copied ? <ClipboardCheck /> : <Clipboard />}
          </Button>
        </div>
      </CopyToClipboard>

      {isSyntaxHighlighterLoaded ? (
        <SyntaxHighlighter
          language={value.language}
          style={gruvboxDark}
          customStyle={{
            borderTopLeftRadius: "0",
            borderTopRightRadius: "0",
          }}
        >
          {value.code!}
        </SyntaxHighlighter>
      ) : (
        <Skeleton
          className="rounded-t-none"
          style={{ height: `${getHeightFromLinesOfCode(value.code!)}px` }}
        />
      )}
    </div>
  );
}
function getHeightFromLinesOfCode(code: string) {
  const lines = code.split("\n");

  const lineHeight = 28.8;

  // the 19 signifies the estimated padding height of the code block
  return Math.floor(lines.length * lineHeight + 19);
}
