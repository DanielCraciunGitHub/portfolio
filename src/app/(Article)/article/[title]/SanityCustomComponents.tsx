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
      <Link
        className="text-blue-500"
        href={value.href}
        target="_blank"
        rel="noopener noreferrer"
      >
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
      <div className="flex flex-col justify-center items-center space-y-0">
        <Image
          priority
          src={urlForImage(value)}
          alt="Blog Image"
          width={750}
          height={400}
          className="rounded-md"
        />
        <p className="block text-sm sm:text-base leading-8 tracking-tight text-muted-foreground">
          {value.caption}
        </p>
      </div>
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
