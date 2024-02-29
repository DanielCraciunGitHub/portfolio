import Image from "next/image"
import Link from "next/link"
import { PortableTextComponents } from "@portabletext/react"
import { CodeInputValue } from "@sanity/code-input"
import { SanityImageAssetDocument } from "next-sanity"

import { urlForImage } from "../../../../../sanity/lib/image"
import { CodeBlock } from "../SanityCodeBlock"

export const myPortableTextComponents: PortableTextComponents = {
  marks: {
    link: ({ value, children }) => (
      <Link href={value.href} target="_blank" rel="noopener noreferrer">
        {children}
      </Link>
    ),
    // internalLink: ({ value, children }) => {
    //   const { slug = {} } = value
    //   const href = `/${slug.current}`
    //   return (
    //     <Link
    //       href={`/article/${href}`}
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       {children}
    //     </Link>
    //   )
    // },
  },
  types: {
    Image: ({ value }: { value: SanityImageAssetDocument }) => (
      <Image
        priority
        src={urlForImage(value)}
        alt="Blog Image"
        width={800}
        height={800}
        className="rounded-md"
      />
    ),
    Code: ({ value }: { value: CodeInputValue }) => {
      return <CodeBlock value={value} />
    },
    Divider: () => <hr className="my-4 border-muted-foreground/50" />,
    Table: () => {
      return null
    },
  },
}
