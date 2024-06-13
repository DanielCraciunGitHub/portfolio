import { Metadata } from "next"
import Script from "next/script"
import { danielConfig } from "@/config"

import { staticMetadata } from "@/config/metadata"
import { staticStructuredData } from "@/config/structuredData"

import ProjectCard from "./ProjectCard"

export const metadata: Metadata = {
  ...staticMetadata.projects,
}

export default function page() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="my-6 text-xl font-extrabold tracking-tight md:text-3xl xl:text-5xl">
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
