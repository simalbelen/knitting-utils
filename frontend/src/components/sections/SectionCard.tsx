import { useNavigate } from "react-router-dom";
import type { Section } from "../../types/Section";
import { CheckIcon } from "../icons/CheckIcon";
import { useDisclosure } from "@heroui/react";
import SectionCardOptions from "./SectionCardOptions";
import SectionModal from "./SectionModal";

interface Props {
  section: Section;
}

function SectionCard({ section }: Props) {
  const navigate = useNavigate();
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onOpenChange: onOpenChangeEdit,
  } = useDisclosure();
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onOpenChange: onOpenChangeDelete,
  } = useDisclosure();
  const {
    isOpen: isOpenDuplicate,
    onOpen: onOpenDuplicate,
    onOpenChange: onOpenChangeDuplicate,
  } = useDisclosure();

  const handleOnClick = () => {
    navigate(`/project/${section.project}/section/${section._id}`);
  };

  return (
    <div
      className="bg-secondary w-2/3 rounded-2xl p-4 relative"
      onClick={handleOnClick}
    >
      <div className="flex justify-between">
        <div className="flex gap-4 items-center">
          {(section.current_row ?? 0) >= section.goal_row && (
            <CheckIcon width={36} height={36} />
          )}
          <h1 className="text-2xl">Sección: {section.title}</h1>
        </div>
        <SectionCardOptions
          handleEdit={onOpenEdit}
          handleDelete={onOpenDelete}
          handleDuplicate={onOpenDuplicate}
        />
      </div>
      <div className="bg-accent h-[2px] my-2" />
      <div className="flex justify-end">
        <h3>
          Progreso:{" "}
          {(((section.current_row ?? 0) / section.goal_row) * 100).toFixed(0)}%
        </h3>
      </div>

      <SectionModal
        title={`Edición de ${section.title}`}
        isOpen={isOpenEdit}
        projectId={section.project}
        onOpenChange={onOpenChangeEdit}
      />
    </div>
  );
}

export default SectionCard;
