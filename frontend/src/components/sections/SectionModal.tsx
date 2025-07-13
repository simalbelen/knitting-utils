import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/react";
import type { Section } from "../../types/Section";
import EditSectionForm from "./EditSectionForm";
import AddSectionForm from "./AddSectionForm";

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
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
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
