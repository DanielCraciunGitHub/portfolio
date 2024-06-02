import Image from "next/image";
import Link from "next/link";
import { Eye } from "lucide-react";

import { BlogCard } from "@/types/blog";
import { formatArticleViews, formatTimeToNow, nameToPath } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { trpc } from "../../server/client";
import { urlFor, urlForImage } from "../../../sanity/lib/image";
import { AuthorAvatar } from "@/components/AuthorAvatar";

export default function ArticleCard({
  title,
  currentSlug,
  image,
  author,
  subtitle,
  category,
  _createdAt,
}: BlogCard) {
  const { data: views } = trpc.blogRouter.getArticleViews.useQuery(
    { slug: currentSlug, author: author?.name },
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  );

  return (
    <Link
      href={`/article/${currentSlug}`}
      className="flex w-[350px] self-stretch rounded-lg ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:w-[400px] xl:w-[450px]"
      tabIndex={0}
    >
      <Card className="flex flex-col border-muted-foreground bg-muted ring-1 ring-muted-foreground dark:border-muted dark:ring-muted">
        <Image
          src={urlFor(image).size(1200, 600).url()}
          priority
          alt={title}
          width={500}
          height={500}
          className="rounded-t-lg"
        />
        <div className="flex h-full flex-col justify-between">
          <CardHeader className="text-wrap break-words">
            <span className="lg:text-2x flex grow text-lg font-bold sm:text-xl xl:text-3xl">
              {title}
            </span>
            <CardDescription className="text-base tracking-tight md:text-lg">
              {subtitle}
            </CardDescription>
          </CardHeader>

          <div className="flex flex-col">
            <CardFooter className="flex justify-between pb-3">
              <Link href={`/blog${nameToPath(category)}`}>
                <Badge className="inline-flex bg-muted-foreground font-bold">
                  {category}
                </Badge>
              </Link>

              <div className="text-sm font-semibold text-muted-foreground">
                {formatTimeToNow(new Date(_createdAt))}
              </div>
            </CardFooter>
            <CardFooter className="flex justify-between pt-2 font-semibold">
              <div>
                {author ? (
                  <AuthorAvatar
                    avatar={
                      author.avatar ? urlForImage(author.avatar) : undefined
                    }
                    name={author.name}
                  />
                ) : (
                  <AuthorAvatar
                    avatar="/images/daniel.png"
                    name="Daniel Craciun"
                  />
                )}
              </div>
              <div className="flex items-center space-x-2 text-primary">
                <Eye
                  className={`size-5 ${views && views > 500 ? "text-yellow-500" : ""}`}
                />
                <div
                  className={`${views && views > 500 ? "text-yellow-500" : ""}`}
                >
                  {formatArticleViews(views ?? 0)}
                </div>
              </div>
            </CardFooter>
          </div>
        </div>
      </Card>
    </Link>
  );
}
