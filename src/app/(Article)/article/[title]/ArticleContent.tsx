import dynamic from "next/dynamic"
import Image from "next/image"
import Script from "next/script"
import { danielConfig, siteConfig } from "@/config"
import { PortableText } from "@portabletext/react"
import readingDuration from "reading-duration"
import { WebPage, WithContext } from "schema-dts"

import { Article as BlogArticle } from "@/types/blog"
import { baseStructuredData } from "@/config/structuredData"
import { getCurrentArticle } from "@/lib/blogs"
import { CaptionSource, formatTimeToNow } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { AuthorAvatar } from "@/components/AuthorAvatar"

import { urlForImage } from "../../../../../sanity/lib/image"
import ArticleViews from "../ArticleViews"
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

  function ArticleStructuredData(article: BlogArticle) {
    const featuredImage = urlForImage(article.image)

    const structuredData: WithContext<WebPage> = {
      ...baseStructuredData,
      "@id": `${siteConfig.url}/article/${article.currentSlug}`,
      url: `${siteConfig.url}/article/${article.currentSlug}`,
      name: `${article.title} - Info Library`,
      description: article.subtitle,
      disambiguatingDescription: article.subtitle,
      datePublished: article._createdAt,
      thumbnailUrl: featuredImage,
      primaryImageOfPage: {
        "@type": "ImageObject",
        "@id": `${siteConfig.url}/article/${article.currentSlug}/#primaryImage`,
        url: featuredImage,
        contentUrl: featuredImage,
        /* @ts-expect-error - unkown caption type from sanity */
        caption: article.image.caption,
      },
      author: {
        "@type": "Person",
        name: article.author?.name ?? danielConfig.name,
        image: {
          "@type": "ImageObject",
          "@id": `${siteConfig.url}/article/${article.currentSlug}/#personImage`,
          url: article.author?.avatar
            ? urlForImage(article.author.avatar)
            : `${siteConfig.url}/favicon.ico`,
          contentUrl: article.author?.avatar
            ? urlForImage(article.author.avatar)
            : `${siteConfig.url}/favicon.ico`,
          caption: article.author?.name ?? danielConfig.name,
        },
      },
      breadcrumb: {
        "@type": "BreadcrumbList",
        "@id": `${siteConfig.url}/article/${article.currentSlug}/#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Info Library",
            item: `${siteConfig.url}/blog`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: article.title,
            item: `${siteConfig.url}/article/${article.currentSlug}`,
          },
        ],
      },
    }

    return (
      <Script
        id="WebSite Structured Data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
    )
  }

  return (
    <div className="mx-auto mt-5 max-w-2xl">
      <div className="flex items-center justify-between space-x-4">
        <Badge variant="secondary" className="inline-flex">
          {article.category}
        </Badge>
        <div className="flex flex-row items-center space-x-2 text-sm font-semibold text-muted-foreground">
          <div>{formatTimeToNow(new Date(article._createdAt))}</div>
          <div>•</div>
          <div>
            <ArticleViews title={title} />
          </div>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between space-x-4">
        <div>
          {article.author ? (
            <AuthorAvatar
              avatar={
                article.author.avatar
                  ? urlForImage(article.author.avatar)
                  : undefined
              }
              name={article.author.name}
            />
          ) : (
            <AuthorAvatar avatar="/images/daniel.webp" name="Daniel Craciun" />
          )}
        </div>
        <div className="text-sm font-semibold text-muted-foreground">
          <ReadingDuration />
        </div>
      </div>
      <h1 className="mt-2 block text-3xl font-bold leading-8 tracking-tight sm:text-4xl">
        {article.title}
      </h1>
      <h4 className="mt-2 block text-xl leading-8 tracking-tight text-muted-foreground sm:text-2xl">
        {article.subtitle}
      </h4>
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

      <div className="prose prose-xl mb-10 mt-10 break-words dark:prose-invert prose-img:m-0 prose-img:mt-2">
        <PortableText
          value={article.content}
          components={myPortableTextComponents}
        />
      </div>
      <BlogInteractor />
      <ArticleStructuredData {...article} />
    </div>
  )
}
