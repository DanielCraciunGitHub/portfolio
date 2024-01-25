import { siteConfig } from "@/config"

import ProjectCard from "./ProjectCard"

export default function page() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:grid-cols-3 place-items-center mt-4">
      {siteConfig.projects.map((project) => (
        <>
          <ProjectCard key={project.href} {...project} />
        </>
      ))}
    </div>
  )
}
