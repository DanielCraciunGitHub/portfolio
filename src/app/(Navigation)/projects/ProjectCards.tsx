import { danielConfig } from "@/config";

import ProjectCard from "@/app/(Navigation)/projects/ProjectCard";

export const ProjectCards = () => {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {danielConfig.projects.map((project) => (
        <ProjectCard key={project.name} {...project} />
      ))}
    </div>
  );
};
