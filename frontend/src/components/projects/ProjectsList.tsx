import { useGetProjects } from "../../hooks/useProjects";
import type { Project } from "../../types/Project";
import ProjectCard from "./ProjectCard";

function ProjectsList() {
  const { data: projects } = useGetProjects();
  return (
    <div className="h-fit flex flex-row flex-wrap gap-4 justify-center items-center py-12 px-4">
      {projects.map((p: Project) => (
        <ProjectCard key={p._id} project={p} />
      ))}
    </div>
  );
}

export default ProjectsList;
