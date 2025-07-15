import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/react";
import AddProjectForm from "./AddProjectForm";
import type { Project } from "../../types/Project";
import EditProjectForm from "./EditProjectForm";
import { EditIcon } from "../icons/EditIcon";
import { CreateIcon } from "../icons/CreateIcon";

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
      isDismissable={false}
      isKeyboardDismissDisabled={false}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                {project ? (
                  <EditIcon width={24} height={24} />
                ) : (
                  <CreateIcon width={24} height={24} />
                )}
                <h1>{title}</h1>
              </div>
            </ModalHeader>
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
