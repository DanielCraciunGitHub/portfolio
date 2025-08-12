import Image from "next/image";
import Link from "next/link";
import { urlFor, urlForImage } from "@/sanity/lib/image";
import { format } from "date-fns";
import { ArrowRight, Clock } from "lucide-react";

import type { BlogCard } from "@/types/blog";
import { formatTimeToNow } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { AuthorAvatar } from "@/components/AuthorAvatar";

export default function ArticleCard({
  title,
  currentSlug,
  image,
  authors,
  subtitle,
  _createdAt,
}: BlogCard) {
  const relativeTime = formatTimeToNow(new Date(_createdAt));
  const publishedDate = format(new Date(_createdAt), "MMM dd, yy");

  return (
    <Link href={`/article/${currentSlug}`}>
      <Card className="group overflow-hidden border-2 transition-all duration-300 hover:border-primary/50 hover:shadow-xl">
        <div className="relative overflow-hidden">
          {image ? (
            <div className="aspect-video overflow-hidden">
              <Image
                src={urlFor(image).size(1200, 600).url()}
                alt={title}
                width={600}
                height={400}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                quality={75}
              />
            </div>
          ) : (
            <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
              <div className="text-lg font-medium text-muted-foreground">
                {title.slice(0, 2).toUpperCase()}
              </div>
            </div>
          )}

          {/* Overlay with read time */}
          <div className="absolute right-4 top-4">
            {relativeTime && (
              <Badge className="bg-primary/90 text-primary-foreground backdrop-blur-sm">
                <Clock className="mr-1 size-3" />
                {relativeTime}
              </Badge>
            )}
          </div>
        </div>

        <CardContent className="space-y-4 p-6">
          <div className="space-y-3">
            <h3 className="line-clamp-2 text-xl font-bold leading-tight transition-colors group-hover:text-primary">
              {title}
            </h3>

            {subtitle && (
              <p className="line-clamp-3 leading-relaxed text-muted-foreground">
                {subtitle}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between border-t border-border/50 pt-4">
            <div className="flex items-center space-x-3">
              {authors ? (
                authors.map((author) => (
                  <AuthorAvatar
                    key={author.name}
                    avatar={
                      author.avatar
                        ? urlForImage(author.avatar)
                        : undefined
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

              <div className="text-sm text-muted-foreground">
                {format(new Date(_createdAt), "MMM dd, yyyy")}
              </div>
            </div>

            <ArrowRight className="size-5 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-primary" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
