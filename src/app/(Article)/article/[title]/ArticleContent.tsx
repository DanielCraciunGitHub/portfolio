import dynamic from "next/dynamic"
import Image from "next/image"
import { PortableText } from "@portabletext/react"
import readingDuration from "reading-duration"

import { getCurrentArticle } from "@/lib/blogs"
import { CaptionSource, formatTimeToNow } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { AuthorAvatar } from "@/components/AuthorAvatar"

import { urlForImage } from "../../../../../sanity/lib/image"
import { myPortableTextComponents } from "../SanityCustomComponents"

const BlogInteractor = dynamic(
  () =>
    import("../_BlogInteraction/BlogInteractor").then(
      (mod) => mod.BlogInteractor
    ),
  { ssr: false }
)

interface ArticleContentProps {
  title: string
}

export const ArticleContent = async ({ title }: ArticleContentProps) => {
  const article = await getCurrentArticle(title)

  function ReadingDuration() {
    const articleBlockText = article?.content
      ?.flatMap((content) => content?.children)
      // @ts-ignore
      .map((block) => block?.text)
      .join(" ")

    const articleCode = article?.content
      ?.filter((content) => content?.code)
      .map((content) => content?.code)
      .join(" ")

    const rawArticleContent = `${articleBlockText}\n\n${articleCode} `

    return readingDuration(rawArticleContent, {
      emoji: false,
      wordsPerMinute: 150,
    })
  }

  return (
    <div className="mt-5 mx-auto max-w-2xl">
      <div className="flex items-center justify-between space-x-4">
        <Badge variant="secondary" className="inline-flex">
          {article.category}
        </Badge>
        <div className="flex flex-row items-center space-x-2 text-sm text-muted-foreground font-semibold">
          <div>
            <ReadingDuration />
          </div>
          <div>•</div>
          <div>{formatTimeToNow(new Date(article._createdAt))}</div>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between space-x-4">
        {article.author ? (
          <AuthorAvatar
            avatar={urlForImage(article.author.avatar)}
            name={article.author.name}
          />
        ) : (
          <AuthorAvatar avatar="/images/daniel.png" name="Daniel Craciun" />
        )}
      </div>
      <h1 className="mt-2 block text-3xl leading-8 font-bold tracking-tight sm:text-4xl">
        {article.title}
      </h1>
      <h4 className="mt-2 block text-xl leading-8 tracking-tight sm:text-2xl text-muted-foreground">
        {article.subtitle}
      </h4>
      <div className="flex flex-col justify-center items-center space-y-2">
        <Image
          priority
          src={urlForImage(article.image)}
          alt={article.title}
          width={800}
          height={800}
          className="rounded-md mt-5"
        />
        <div className="block text-sm sm:text-base leading-8 tracking-tight text-muted-foreground">
          {/* @ts-expect-error - unkown caption type from sanity */}
          <CaptionSource caption={article.image.caption} />
        </div>
      </div>
      <div className="mt-10 prose prose-xl dark:prose-invert mb-10 prose-blockquote:italic prose-img:m-0 prose-figcaption:italic prose-img:mt-2">
        <PortableText
          value={article.content}
          components={myPortableTextComponents}
        />
      </div>
      <BlogInteractor />
    </div>
  )
}
