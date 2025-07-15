import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import type { ReactNode } from "react";

interface Props {
  isOpen: boolean;
  onOpenChange: () => void;
  icon: ReactNode;
  title: string;
  content: ReactNode;
  handleConfirmation: () => void;
}
function ConfirmationModal({
  isOpen,
  onOpenChange,
  icon,
  title,
  content,
  handleConfirmation,
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
                {icon}
                <h1>{title}</h1>
              </div>
            </ModalHeader>
            <ModalBody>{content}</ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancelar
              </Button>
              <Button
                color="primary"
                onPress={() => {
                  handleConfirmation();
                  onClose();
                }}
              >
                Confirmar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default ConfirmationModal;
