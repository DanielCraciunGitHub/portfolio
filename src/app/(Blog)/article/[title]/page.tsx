import Image from "next/image"
import { PortableText } from "@portabletext/react"
import { CodeInputValue } from "@sanity/code-input"
import { Image as SanityImage } from "sanity"

import { getCurrentArticle } from "@/lib/blogs"
import { Badge } from "@/components/ui/badge"

import { urlForImage } from "../../../../../sanity/lib/image"
import { CodeBlock } from "../CodeBlock"

interface pageProps {
  params: { title: string }
}

const myPortableTextComponents = {
  types: {
    Image: ({ value }: { value: SanityImage }) => (
      <Image
        priority
        src={urlForImage(value)}
        alt={"Blog Image"}
        width={800}
        height={800}
        className="rounded-md"
      />
    ),
    Code: ({ value }: { value: CodeInputValue }) => {
      return <CodeBlock value={value} />
    },
  },
}
export default async function page({ params }: pageProps) {
  const article = await getCurrentArticle(params.title)

  console.log(article.content)
  return (
    <div className="mt-5 mx-auto max-w-2xl">
      <Badge variant="secondary" className="inline-flex">
        {article.category}
      </Badge>
      <h1 className="mt-3 block text-3xl leading-8 font-bold tracking-tight sm:text-4xl">
        {article.title}
      </h1>
      <h2 className="mt-2 block text-xl leading-8 tracking-tight sm:text-2xl dark:text-gray-400">
        {article.subtitle}
      </h2>
      <Image
        priority
        src={urlForImage(article.image)}
        alt={article.title}
        width={800}
        height={800}
        className="rounded-md mt-5"
      />
      <div className="mt-10 prose prose-xl dark:prose-invert">
        <PortableText
          value={article.content}
          components={myPortableTextComponents}
        />
      </div>
    </div>
  )
}
