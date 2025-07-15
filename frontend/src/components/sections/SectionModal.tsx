import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/react";
import type { Section } from "../../types/Section";
import EditSectionForm from "./EditSectionForm";
import AddSectionForm from "./AddSectionForm";
import { EditIcon } from "../icons/EditIcon";
import { CreateIcon } from "../icons/CreateIcon";

interface Props {
  title: string;
  section?: Section;
  isOpen: boolean;
  projectId: string;
  onOpenChange: () => void;
}
function SectionModal({
  title,
  section,
  projectId,
  isOpen,
  onOpenChange,
}: Props) {
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
                {section ? (
                  <EditIcon width={24} height={24} />
                ) : (
                  <CreateIcon width={24} height={24} />
                )}
                <h1>{title}</h1>
              </div>
            </ModalHeader>
            <ModalBody>
              {section ? (
                <EditSectionForm onClose={onClose} section={section} />
              ) : (
                <AddSectionForm onClose={onClose} projectId={projectId} />
              )}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default SectionModal;
