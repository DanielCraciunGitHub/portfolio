import { Metadata } from "next"
import { danielConfig } from "@/config"

import { staticMetadata } from "@/config/metadata"

import ProjectCard from "./ProjectCard"

export const metadata: Metadata = {
  ...staticMetadata.projects,
}

export default function page() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:grid-cols-3 place-items-center mt-4">
      {danielConfig.projects.map((project) => (
        <ProjectCard key={project.name} {...project} />
      ))}
    </div>
  )
}
