import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { OptionsIcon } from "../icons/OptionsIcon";
import { EditIcon } from "../icons/EditIcon";
import { CopyIcon } from "../icons/CopyIcon";
import { DeleteIcon } from "../icons/DeleteIcon";

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
    <Dropdown className="bg-tertiary text-white">
      <DropdownTrigger>
        <div className="hover:cursor-pointer">
          <OptionsIcon width={24} height={24} />
        </div>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem
          key="edit"
          onClick={handleEdit}
          startContent={<EditIcon width={16} height={16} />}
        >
          Editar
        </DropdownItem>
        <DropdownItem
          key="copy"
          onClick={handleDuplicate}
          startContent={<CopyIcon width={16} height={16} />}
        >
          Duplicar
        </DropdownItem>
        <DropdownItem
          key="delete"
          color="danger"
          onClick={handleDelete}
          startContent={<DeleteIcon width={16} height={16} />}
        >
          Borrar
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default SectionCardOptions;
