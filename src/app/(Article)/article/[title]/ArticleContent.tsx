/* eslint-disable no-underscore-dangle */
import dynamic from "next/dynamic"
import Image from "next/image"
import { urlForImage } from "@/sanity/lib/image"
import { api } from "@/server/trpc/serverClient"
import { PortableText } from "@portabletext/react"
import { format } from "date-fns"
import readingDuration from "reading-duration"
import { myPortableTextComponents } from "src/app/(Article)/article/SanityCustomComponents"

import { getCurrentArticle } from "@/lib/blogs"
import { CaptionSource } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { AuthorAvatar } from "@/components/AuthorAvatar"

const BlogInteractor = dynamic(
  () =>
    import("../_BlogInteraction/BlogInteractor").then(
      (mod) => mod.BlogInteractor
    ),
)

interface ArticleContentProps {
  title: string
}

export const ArticleContent = async ({ title }: ArticleContentProps) => {
  const article = await getCurrentArticle(title)
  const publishedDate = format(new Date(article._createdAt), "MMM dd, yy")

  const views = await api.blogRouter.getArticleViews({
    slug: title,
  })
  await api.blogRouter.addArticleView({
    slug: title,
    views: views ?? 0,
  })

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
    <div className="mx-auto mt-5 max-w-2xl">
      <div className="flex items-center justify-between space-x-4">
        <Badge variant="secondary" className="inline-flex">
          {article.category}
        </Badge>
      </div>
      <h1 className="mt-2 block text-3xl font-bold leading-8 tracking-tight sm:text-4xl">
        {article.title}
      </h1>
      <h4 className="mt-2 block text-xl leading-8 tracking-tight text-muted-foreground sm:text-2xl">
        {article.subtitle}
      </h4>
      <div className="mt-3 flex flex-col items-start justify-between space-y-2 md:flex-row md:items-center md:space-y-0">
        <div className="flex flex-col space-y-2 md:flex-row">
          {article.authors ? (
            article.authors.map((author) => (
              <AuthorAvatar
                dateStr={publishedDate}
                key={author.name}
                avatar={author.avatar ? urlForImage(author.avatar) : undefined}
                name={author.name}
                social={author.social}
              />
            ))
          ) : (
            <AuthorAvatar
              dateStr={publishedDate}
              avatar="/images/daniel.webp"
              name="Daniel Craciun"
            />
          )}
        </div>
        <div className="rounded bg-green-700 px-2 text-sm text-white">
          <ReadingDuration />
        </div>
      </div>
      {article.image ? (
        <div className="flex flex-col items-center justify-center space-y-2">
          <Image
            priority
            src={urlForImage(article.image)}
            alt={article.title}
            width={800}
            height={800}
            className="mt-5 rounded-md"
          />

          {/* @ts-expect-error - unkown caption type from sanity */}
          <CaptionSource caption={article.image.caption} />
        </div>
      ) : null}

      <div className="prose prose-xl my-10 break-words dark:prose-invert prose-img:m-0 prose-img:mt-2">
        <PortableText
          value={article.content}
          components={myPortableTextComponents}
        />
      </div>
      <BlogInteractor />
    </div>
  )
}
