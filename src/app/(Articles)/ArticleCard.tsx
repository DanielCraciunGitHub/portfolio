import Image from "next/image"
import Link from "next/link"

import { BlogCard } from "@/types/blog"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { urlFor } from "../../../sanity/lib/image"

export default function ArticleCard({
  title,
  currentSlug,
  image,
  subtitle,
  category,
  _createdAt,
}: BlogCard) {
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
        <CardFooter className="flex flex-col md:flex-row md:justify-between space-y-2 md:space-y-0">
          <Badge variant="secondary" className="inline-flex">
            {category}
          </Badge>
          <div className="text-xs">{new Date(_createdAt).toDateString()}</div>
        </CardFooter>
      </Card>
    </Link>
  )
}
