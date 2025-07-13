import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/react";
import AddProjectForm from "./AddProjectForm";
import type { Project } from "../../types/Project";
import EditProjectForm from "./EditProjectForm";

interface Props {
  title: string;
  project?: Project;
  isOpen: boolean;
  onOpenChange: () => void;
}
function ProjectModal({ title, project, isOpen, onOpenChange }: Props) {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="text-accent bg-tertiary"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>
              {project ? (
                <EditProjectForm onClose={onClose} project={project} />
              ) : (
                <AddProjectForm onClose={onClose} />
              )}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default ProjectModal;
