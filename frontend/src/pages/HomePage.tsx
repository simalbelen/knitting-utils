import TitleLayout from "../layouts/TitleLayout";
import { Button, useDisclosure } from "@heroui/react";
import { PlusIcon } from "../components/icons/PlusIcon";
import ProjectModal from "../components/ProjectModal";
import ProjectsList from "../components/ProjectsList";

function HomePage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <TitleLayout title="Mis proyectos">
      <div>
        <Button
          isIconOnly
          color="secondary"
          className="p-2 w-fit h-fit absolute bottom-10 right-10"
          onPress={onOpen}
        >
          <PlusIcon width={36} height={36} />
        </Button>
        <ProjectsList />
      </div>
      <ProjectModal
        title="Crear un nuevo proyecto"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </TitleLayout>
  );
}

export default HomePage;
