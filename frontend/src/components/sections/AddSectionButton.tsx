import { Button, useDisclosure } from "@heroui/react";
import { PlusIcon } from "../icons/PlusIcon";
import SectionModal from "./SectionModal";

interface Props {
  projectId: string;
}
function AddSectionButton({ projectId }: Props) {
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
      <SectionModal
        title="Crear sección"
        projectId={projectId}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </>
  );
}

export default AddSectionButton;
