import type { Metadata } from "next"
import Script from "next/script"
import { danielConfig } from "@/config"
import ProjectCard from "src/app/(Navigation)/projects/ProjectCard"

import { staticMetadata } from "@/config/metadata"
import { staticStructuredData } from "@/config/structuredData"

export const metadata: Metadata = {
  ...staticMetadata.projects,
}

export const ProjectCards = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="my-6 text-sm self-start font-extrabold tracking-tight md:text-xl xl:text-3xl">
        My Projects
      </h1>
      <div className="grid grid-cols-1 place-items-center gap-20 lg:grid-cols-2 2xl:grid-cols-3">
        {danielConfig.projects.map((project) => (
          <ProjectCard key={project.name} {...project} />
        ))}
        <div>
          <Script
            id="WebSite Structured Data"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(staticStructuredData.projects),
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default function page() {
  return (
    <ProjectCards />
  )
}
