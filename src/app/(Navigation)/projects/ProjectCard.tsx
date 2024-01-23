import Image from "next/image"
import Link from "next/link"
import { Project } from "@/types"
import { BsGithub } from "react-icons/bs"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface ProjectCardProps extends Project {}

export default function ProjectCard({
  name,
  href,
  imageHref,
  description,
  type,
}: ProjectCardProps) {
  return (
    <Card className="w-2/3">
      <div className="group relative flex flex-col items-center justify-center">
        <Image
          priority
          src={imageHref}
          alt={name}
          width={1000}
          height={300}
          className="rounded-t-lg group-hover:blur-sm"
        />
        <div className="invisible space-x-10 absolute w-full h-full group-hover:visible group-hover:flex group-hover:items-center group-hover:justify-center">
          <Link href={href}>
            <BsGithub className="sm:size-10 size-5" />
          </Link>
        </div>
      </div>

      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Badge variant="secondary">{type}</Badge>
      </CardFooter>
    </Card>
  )
}
