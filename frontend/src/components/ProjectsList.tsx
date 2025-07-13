import { useDisclosure } from "@heroui/react";
import { useGetProjects } from "../hooks/useProjects";
import type { Project } from "../types/Project";
import ProjectCard from "./ProjectCard";

function ProjectsList() {
  const { data: projects } = useGetProjects();
  return (
    <div className="h-fill">
      <div className="flex flex-row flex-wrap gap-4 justify-center items-center p-4 h-full overflow-y-auto scroll-hidden">
        {projects.map((p: Project) => (
          <ProjectCard key={p._id} project={p} />
        ))}
      </div>
    </div>
  );
}

export default ProjectsList;
