import Image from "next/image"
import Link from "next/link"

import { BlogCard } from "@/types/blog"
import { nameToPath } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { urlForImage } from "../../lib/sanity/lib/image"

export default function ArticleCard({
  title,
  currentSlug,
  image,
  subtitle,
  category,
  _createdAt,
}: BlogCard) {
  return (
    <Link href={`${nameToPath(category)}/${currentSlug}`} className="w-2/3">
      <Card>
        <Image
          priority
          src={urlForImage(image)}
          alt={title}
          width={500}
          height={500}
          className="rounded-t-lg"
        />
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{subtitle}</CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-between">
          <Badge variant="secondary" className="inline-flex">
            {category}
          </Badge>
          <div className="text-xs">{new Date(_createdAt).toDateString()}</div>
        </CardFooter>
      </Card>
    </Link>
  )
}
