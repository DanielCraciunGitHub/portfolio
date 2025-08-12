import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types";
import { BsCalendar, BsGithub, BsGlobe } from "react-icons/bs";

import { formatProjectDates } from "@/lib/dateUtils";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription } from "@/components/ui/card";

interface ProjectCardProps extends Project {}

export default function ProjectCard({
  name,
  href,
  imageHref,
  description,
  type,
  startDate,
  endDate,
}: ProjectCardProps) {
  return (
    <Card className="group relative overflow-hidden border-2 transition-all duration-300 hover:border-primary/50 hover:shadow-xl">
      <div className="relative overflow-hidden">
        <Image
          priority
          src={imageHref}
          alt={name}
          width={500}
          height={300}
          className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Overlay on hover */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {href.includes("github") ? (
              <>
                <BsGithub className="size-5" />
                View Code
              </>
            ) : (
              <>
                <BsGlobe className="size-5" />
                Visit Site
              </>
            )}
          </Link>
        </div>
      </div>

      <div className="space-y-4 p-6">
        <div className="space-y-2">
          <h3 className="line-clamp-1 text-xl font-bold transition-colors group-hover:text-primary">
            {name}
          </h3>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              {type}
            </Badge>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <BsCalendar className="size-3" />
              <span>{formatProjectDates(startDate, endDate)}</span>
            </div>
          </div>
        </div>

        <CardDescription className="line-clamp-3 text-sm leading-relaxed">
          {description}
        </CardDescription>

        <div className="pt-2">
          <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            Learn more
            <svg
              className="size-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </Card>
  );
}
