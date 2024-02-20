"use client"

import { useState } from "react"
import { CodeInputValue } from "@sanity/code-input"
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
    <div className="flex flex-col space-y-0">
      <CopyToClipboard text={value.code!} onCopy={() => setCopied(true)}>
        <Button
          variant="ghost"
          className="flex justify-end hover:bg-inherit text-primary"
        >
          {copied ? "Copied!" : "Copy"}
        </Button>
      </CopyToClipboard>
      <SyntaxHighlighter
        language={value.code}
        showLineNumbers
        style={atomOneDark}
      >
        {value.code!}
      </SyntaxHighlighter>
    </div>
  )
}
