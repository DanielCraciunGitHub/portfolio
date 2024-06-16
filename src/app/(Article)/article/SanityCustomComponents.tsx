import Image from "next/image"
import Link from "next/link"
import { PortableTextComponents } from "@portabletext/react"
import { CodeInputValue } from "@sanity/code-input"
import { SanityImageAssetDocument } from "next-sanity"

import { CaptionSource } from "@/lib/utils"
import { TweetEmbed } from "@/components/TweetEmbed"
import { YoutubeEmbed } from "@/components/YoutubeEmbed"

import { urlForImage } from "../../../../sanity/lib/image"
import { CodeBlock } from "./SanityCodeBlock"

export const myPortableTextComponents: PortableTextComponents = {
  marks: {
    link: ({ value, children }) => (
      <Link
        className="text-blue-500"
        href={`${value.href}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </Link>
    ),
    code: ({ value, children }) => (
      <span className="rounded bg-gray-300 p-0.5 font-mono dark:bg-gray-500">
        {children}
      </span>
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
      <div className="flex flex-col items-center justify-center">
        <Image
          priority
          src={urlForImage(value)}
          alt={value.caption ?? "Blog Image"}
          width={800}
          height={800}
          className="rounded-md"
        />

        <CaptionSource caption={value.caption} />
      </div>
    ),
    Code: ({ value }: { value: CodeInputValue }) => {
      return <CodeBlock value={value} />
    },
    Divider: () => <hr className="my-4 border-muted-foreground/50" />,
    Table: () => {
      return null
    },
    Tweet: ({ value }: any) => {
      return <TweetEmbed tweetId={value.tweetId} />
    },
    Youtube: ({ value }: any) => {
      return <YoutubeEmbed videoid={value.videoId} />
    },
  },
}
