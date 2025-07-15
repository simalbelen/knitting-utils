import { Breadcrumbs, BreadcrumbItem } from "@heroui/react";

interface Props {
  projectId?: string;
  projectTitle?: string;
  sectionId?: string;
  sectionTitle?: string;
}

function Breadcrumb({
  projectId,
  projectTitle,
  sectionId,
  sectionTitle,
}: Props) {
  return (
    <Breadcrumbs
      size="lg"
      itemClasses={{
        item: ["data-[current=true]:text-2xl"],
      }}
    >
      <BreadcrumbItem href="/">Mis proyectos</BreadcrumbItem>
      {projectId && (
        <BreadcrumbItem href={`/project/${projectId}`}>
          {projectTitle ?? "Proyecto"}
        </BreadcrumbItem>
      )}
      {sectionId && (
        <BreadcrumbItem href={`/project/${projectId}/section/${sectionId}`}>
          {sectionTitle ?? "Sección"}
        </BreadcrumbItem>
      )}
    </Breadcrumbs>
  );
}

export default Breadcrumb;
