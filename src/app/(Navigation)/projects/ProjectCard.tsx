import Image from "next/image";
import Link from "next/link";
import { Project } from "@/types";
import { BsGithub } from "react-icons/bs";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
        <div className="invisible absolute h-full w-full space-x-10 group-hover:visible group-hover:flex group-hover:items-center group-hover:justify-center">
          <Link href={href} target="_blank" rel="noopener noreferrer">
            <BsGithub className="size-5 sm:size-10" />
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
  );
}
