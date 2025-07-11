import type { Project } from "../types/Project";
import { useNavigate } from "react-router-dom";

interface Props {
  project: Project;
}
function ProjectCard({ project }: Props) {
  const navigate = useNavigate();
  const handleOnClick = () => {
    navigate(`/project/${project._id}`);
  };
  return (
    <div
      className="bg-purple-400 p-4 rounded-2xl w-1/4 flex flex-col gap-2 justify-center items-center"
      onClick={handleOnClick}
    >
      <span>{project.name}</span>
      <span>{((project.currentRow / project.goalRow) * 100).toFixed(2)}%</span>
    </div>
  );
}

export default ProjectCard;
