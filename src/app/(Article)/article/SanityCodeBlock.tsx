"use client"

import { useState } from "react"
import { CodeInputValue } from "@sanity/code-input"
import { Clipboard, ClipboardCheck } from "lucide-react"
import CopyToClipboard from "react-copy-to-clipboard"
import SyntaxHighlighter from "react-syntax-highlighter"
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs"

import { Button } from "@/components/ui/button"

interface CodeBlockProps {
  value: CodeInputValue
}
export function CodeBlock({ value }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  return (
    <div className="flex flex-col space-y-0 bg-muted-foreground/50 rounded-sm">
      <CopyToClipboard text={value.code!} onCopy={() => setCopied(true)}>
        <div className="ml-auto">
          <Button variant="ghost" className="hover:bg-inherit">
            {copied ? <ClipboardCheck /> : <Clipboard />}
          </Button>
        </div>
      </CopyToClipboard>
      <SyntaxHighlighter
        language={value.code}
        showLineNumbers
        style={atomOneDark}
        customStyle={{
          borderTopLeftRadius: "0",
          borderTopRightRadius: "0",
        }}
      >
        {value.code!}
      </SyntaxHighlighter>
    </div>
  )
}
