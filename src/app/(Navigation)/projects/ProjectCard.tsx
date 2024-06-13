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
    <Card
      className="flex w-[350px] flex-col self-stretch rounded-lg border-muted-foreground bg-muted ring-1 ring-muted-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 dark:border-muted dark:ring-muted md:w-[400px] xl:w-[450px]"
      tabIndex={0}
    >
      <div className="group relative flex flex-col items-center justify-center">
        <Image
          priority
          src={imageHref}
          alt={name}
          width={500}
          height={500}
          className="rounded-t-lg group-hover:blur-sm"
        />
        <div className="invisible absolute h-full w-full space-x-10 group-hover:visible group-hover:flex group-hover:items-center group-hover:justify-center">
          <Link href={href} target="_blank" rel="noopener noreferrer">
            <BsGithub className="size-5 sm:size-10" />
          </Link>
        </div>
      </div>
      <div className="flex h-full flex-col justify-between">
        <CardHeader className="text-wrap break-words">
          <span className="lg:text-2x flex grow text-lg font-bold sm:text-xl xl:text-3xl">
            {name}
          </span>
          <CardDescription className="text-base tracking-tight md:text-lg">
            {description}
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Badge className="inline-flex bg-muted-foreground font-bold">
            {type}
          </Badge>
        </CardFooter>
      </div>
    </Card>
  )
}
