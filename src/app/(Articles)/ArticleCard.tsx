import Image from "next/image";
import Link from "next/link";
import { Eye } from "lucide-react";

import { BlogCard } from "@/types/blog";
import { formatTimeToNow } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { trpc } from "../_trpc/client";
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
    <Link href={`/article/${currentSlug}`} className="w-2/3">
      <Card className="border-muted-foreground ring-1 ring-muted-foreground dark:border-muted dark:ring-muted">
        <Image
          src={urlFor(image).size(1200, 600).url()}
          priority
          alt={title}
          width={500}
          height={500}
          className="rounded-t-lg"
        />
        <CardHeader>
          <CardTitle className="line-clamp-3 text-base font-bold sm:text-lg lg:text-xl xl:text-2xl">
            {title}
          </CardTitle>
          <CardDescription className="truncate">{subtitle}</CardDescription>
        </CardHeader>
        <CardFooter className="flex flex-col space-y-2 pb-3 md:flex-row md:justify-between md:space-y-0">
          <Badge variant="secondary" className="inline-flex">
            {category}
          </Badge>

          <div className="text-sm font-semibold text-muted-foreground">
            {formatTimeToNow(new Date(_createdAt))}
          </div>
        </CardFooter>
        <CardFooter className="flex flex-col justify-center space-y-2 font-semibold md:flex-row md:justify-between md:space-y-0">
          <div>
            {author ? (
              <AuthorAvatar
                avatar={urlForImage(author.avatar)}
                name={author.name}
              />
            ) : (
              <AuthorAvatar avatar="/images/daniel.png" name="Daniel Craciun" />
            )}
          </div>
          <div className="flex items-center space-x-2 text-primary">
            <Eye className="size-5" />
            <div>{views}</div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
