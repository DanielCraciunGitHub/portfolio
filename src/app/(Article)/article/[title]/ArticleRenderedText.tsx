"use client"

import { ElementRef, useRef } from "react"
import {
  PortableText,
  PortableTextComponents,
  PortableTextReactComponents,
} from "@portabletext/react"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { TypedObject } from "sanity"

interface ArticleRenderedTextProps {
  content: TypedObject[]
  customComponents: Partial<PortableTextReactComponents>
}

export const ArticleRenderedText = ({
  content,
  customComponents,
}: ArticleRenderedTextProps) => {
  const contentRef = useRef<ElementRef<"div">>(null)

  const getParsedContent = (): string => {
    if (contentRef.current) {
      return contentRef.current.innerHTML
    }
    return ""
  }

  return (
    <>
      <CopyToClipboard text={getParsedContent()}>
        <button>Copy to Clipboard</button>
      </CopyToClipboard>
      <div
        ref={contentRef}
        className="prose prose-xl mb-10 mt-10 break-words dark:prose-invert prose-img:m-0 prose-img:mt-2"
      >
        <PortableText value={content} components={customComponents} />
      </div>
    </>
  )
}
