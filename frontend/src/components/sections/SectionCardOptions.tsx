import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { OptionsIcon } from "../icons/OptionsIcon";

interface Props {
  handleEdit: () => void;
  handleDelete: () => void;
  handleDuplicate: () => void;
}

function SectionCardOptions({
  handleEdit,
  handleDelete,
  handleDuplicate,
}: Props) {
  return (
    <Dropdown className="bg-tertiary text-accent">
      <DropdownTrigger>
        <OptionsIcon width={24} height={24} />
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="edit" onClick={handleEdit}>
          Editar
        </DropdownItem>
        <DropdownItem key="copy" onClick={handleDuplicate}>
          Duplicar
        </DropdownItem>
        <DropdownItem key="delete" color="danger" onClick={handleDelete}>
          Borrar
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default SectionCardOptions;
