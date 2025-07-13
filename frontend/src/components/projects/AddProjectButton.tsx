import { Button, useDisclosure } from "@heroui/react";
import { PlusIcon } from "../icons/PlusIcon";
import ProjectModal from "./ProjectModal";

function AddProjectButton() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button
        isIconOnly
        color="secondary"
        className="p-2 w-fit h-fit absolute bottom-10 right-10"
        onPress={onOpen}
      >
        <PlusIcon width={36} height={36} />
      </Button>
      <ProjectModal
        title="Crear un nuevo proyecto"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </>
  );
}

export default AddProjectButton;
