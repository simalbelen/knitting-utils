import type { Project } from "../types/Project";
import ProjectCard from "../components/ProjectCard";
import TitleLayout from "../layouts/TitleLayout";
import { Button, useDisclosure } from "@heroui/react";
import { PlusIcon } from "../components/icons/PlusIcon";
import ProjectModal from "../components/ProjectModal";
import { useGetProjects } from "../hooks/useProjects";

function HomePage() {
  const {
    isOpen: isOpenAddProject,
    onOpen: onOpenAddProject,
    onOpenChange: onOpenChangeAddProject,
  } = useDisclosure();
  const { data: projects } = useGetProjects();

  return (
    <TitleLayout title="Mis proyectos">
      <div>
        <Button
          isIconOnly
          color="secondary"
          className="p-2 w-fit h-fit absolute bottom-10 right-10"
          onPress={onOpenAddProject}
        >
          <PlusIcon width={36} height={36} />
        </Button>
        <div className="h-fill">
          <div className="flex flex-row flex-wrap gap-4 justify-center items-center p-4 h-full overflow-y-auto scroll-hidden">
            {projects.map((p: Project) => (
              <>
                <ProjectCard key={p._id} project={p} />
              </>
            ))}
          </div>
        </div>
      </div>
      <ProjectModal
        title="Crear un nuevo proyecto"
        isOpen={isOpenAddProject}
        onOpenChange={onOpenChangeAddProject}
      />
    </TitleLayout>
  );
}

export default HomePage;
