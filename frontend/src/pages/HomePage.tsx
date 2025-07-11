import { useEffect, useState } from "react";
import ProjectService from "../services/ProjectService";
import type { Project } from "../types/Project";
import ProjectCard from "../components/ProjectCard";

function HomePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const fetchProjects = async () => {
    const { data } = await ProjectService.findAll();
    setProjects(data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="flex flex-col">
      {projects.map((p: Project) => (
        <ProjectCard key={p._id} project={p} />
      ))}
    </div>
  );
}

export default HomePage;
