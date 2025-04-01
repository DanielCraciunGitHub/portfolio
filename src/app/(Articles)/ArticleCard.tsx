import Image from "next/image"
import Link from "next/link"
import { urlFor, urlForImage } from "@/sanity/lib/image"
import { format } from "date-fns"

import type { BlogCard } from "@/types/blog"
import { formatTimeToNow } from "@/lib/utils"
import { AuthorAvatar } from "@/components/AuthorAvatar"

export default function ArticleCard({
  title,
  currentSlug,
  image,
  authors,
  subtitle,
  _createdAt,
}: BlogCard) {
  const relativeTime = formatTimeToNow(new Date(_createdAt))
  const publishedDate = format(new Date(_createdAt), "MMM dd, yy")

  return (
    <div
      className="border-lg flex self-stretch rounded-lg border border-muted ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      tabIndex={0}
    >
      <div className="flex flex-col rounded-lg border border-muted">
        <Link href={`/article/${currentSlug}`}>
        {image ? (
          <Image
            src={urlFor(image).size(1200, 600).url()}
            alt={title}
            width={500}
            height={500}
            className="rounded-t-lg"
            quality={15}
          />
        ) : null}
        <div className="flex h-full flex-col justify-between">
          <h1 className="text-wrap break-words p-4">
            <span className="flex grow text-lg font-bold 2xl:text-2xl">
              {title}
            </span>
            <p className="text-base tracking-tight text-muted-foreground md:text-lg">
              {subtitle}
            </p>
            </h1>
          </div>
        </Link>

        <div className="flex items-center space-x-4 p-4 font-semibold">
            {authors ? (
              authors.map((author) => (
                <AuthorAvatar
                  key={author.name}
                  avatar={
                    author.avatar ? urlForImage(author.avatar) : undefined
                  }
                  social={author.social}
                  dateStr={publishedDate}
                />
              ))
            ) : (
              <AuthorAvatar
                dateStr={publishedDate}
                avatar="/images/daniel.webp"
              />
            )}

            <div className="flex items-center space-x-2 text-sm font-semibold text-muted-foreground">
              <div>{format(new Date(_createdAt), "MMM dd, yy")}</div>
              {relativeTime && <span>•</span>}
              <div className="rounded bg-green-700 px-2 text-white">
                {relativeTime}
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}
