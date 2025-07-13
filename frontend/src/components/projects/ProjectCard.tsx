import { Chip, useDisclosure } from "@heroui/react";
import type { Project } from "../../types/Project";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { States } from "../../types/Enumerations";
import { SettingsIcon } from "../icons/SettingsIcon";
import ProjectModal from "./ProjectModal";

interface Props {
  project: Project;
}
function ProjectCard({ project }: Props) {
  const navigate = useNavigate();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const handleOnClick = () => {
    navigate(`/project/${project._id}`);
  };
  return (
    <div className="bg-secondary p-4 rounded-2xl w-1/4 flex flex-col justify-center items-center gap-6 relative">
      <div
        className="absolute top-2 right-2 hover:cursor-pointer"
        onClick={onOpen}
      >
        <SettingsIcon width={24} height={24} />
      </div>
      <div
        onClick={handleOnClick}
        className=" flex flex-col justify-center items-center gap-6"
      >
        <div className="flex flex-col justify-center items-center pt-2">
          <h1 className="text-2xl">{project.title}</h1>
          <span>{project.designer}</span>
        </div>

        <Chip
          className={clsx("text-tertiary border-2 border-tertiary", {
            "bg-green-200": project.status === "created",
            "bg-yellow-200": project.status === "inProgress",
            "bg-red-200": project.status === "finished",
          })}
        >
          {States[project.status]}
        </Chip>
        <ProjectModal
          title={`Edición de ${project.title}`}
          project={project}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        />
      </div>
    </div>
  );
}

export default ProjectCard;
