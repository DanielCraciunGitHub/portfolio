import { projects } from "@/config"

import ProjectCard from "@/app/(Navigation)/projects/ProjectCard"

export const ProjectCards = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="my-6 self-start text-sm font-extrabold tracking-tight md:text-xl xl:text-3xl">
        My Projects
      </h1>
      <div className="grid grid-cols-1 place-items-center gap-20 lg:grid-cols-2 2xl:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.name} {...project} />
        ))}
      </div>
    </div>
  )
}
