import Image from "next/image"
import Link from "next/link"
import { Eye } from "lucide-react"

import { BlogCard } from "@/types/blog"
import { formatTimeToNow } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { trpc } from "../_trpc/client"
import { urlFor } from "../../../sanity/lib/image"

export default function ArticleCard({
  title,
  currentSlug,
  image,
  subtitle,
  category,
  _createdAt,
}: BlogCard) {
  const { data: views } = trpc.blogRouter.getArticleViews.useQuery(
    currentSlug,
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  )
  return (
    <Link href={`/article/${currentSlug}`} className="w-2/3">
      <Card>
        <Image
          src={urlFor(image).size(1200, 600).url()}
          alt={title}
          width={500}
          height={500}
          className="rounded-t-lg"
        />
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription className="truncate">{subtitle}</CardDescription>
        </CardHeader>
        <CardFooter className="flex flex-col md:flex-row md:justify-between space-y-2 md:space-y-0 pb-3">
          <Badge variant="secondary" className="inline-flex">
            {category}
          </Badge>
          <div className="text-sm text-muted-foreground font-semibold">
            {formatTimeToNow(new Date(_createdAt))}
          </div>
        </CardFooter>
        <CardFooter className="flex space-x-2 justify-center md:justify-end text-primary font-semibold">
          <Eye />
          <div>{views}</div>
        </CardFooter>
      </Card>
    </Link>
  )
}
