import { useNavigate } from "react-router-dom";
import type { Section } from "../../types/Section";
import { CheckIcon } from "../icons/CheckIcon";
import { useDisclosure } from "@heroui/react";
import SectionCardOptions from "./SectionCardOptions";
import SectionModal from "./SectionModal";
import ConfirmationModal from "../atoms/ConfirmationModal";
import { CopyIcon } from "../icons/CopyIcon";
import { DeleteIcon } from "../icons/DeleteIcon";
import SectionService from "../../services/SectionService";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  section: Section;
}

function SectionCard({ section }: Props) {
  const queryClient = useQueryClient();
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

  const handleDuplicate = async () => {
    if (section._id) {
      await SectionService.duplicateOne(section._id);
      queryClient.invalidateQueries({ queryKey: ["sectionList"] });
    }
  };
  const handleDelete = async () => {
    if (section._id) {
      await SectionService.deleteOne(section._id);
      queryClient.invalidateQueries({ queryKey: ["sectionList"] });
    }
  };

  return (
    <div className="bg-secondary w-2/3 rounded-2xl p-4 relative">
      <div className="flex justify-between" onClick={handleOnClick}>
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
      <div className="flex justify-end">
        <h3>
          Progreso:{" "}
          {(((section.current_row ?? 0) / section.goal_row) * 100).toFixed(0)}%
        </h3>
      </div>

      <SectionModal
        title={`Editar sección`}
        isOpen={isOpenEdit}
        projectId={section.project}
        section={section}
        onOpenChange={onOpenChangeEdit}
      />
      <ConfirmationModal
        title={`Duplicar sección`}
        isOpen={isOpenDuplicate}
        onOpenChange={onOpenChangeDuplicate}
        icon={<CopyIcon height={24} width={24} />}
        content={<p>¿Quieres duplicar la sección {section.title}?</p>}
        handleConfirmation={handleDuplicate}
      />
      <ConfirmationModal
        title={`Eliminar sección`}
        isOpen={isOpenDelete}
        onOpenChange={onOpenChangeDelete}
        icon={<DeleteIcon height={24} width={24} />}
        content={<p>¿Quieres eliminar la sección {section.title}?</p>}
        handleConfirmation={handleDelete}
      />
    </div>
  );
}

export default SectionCard;
