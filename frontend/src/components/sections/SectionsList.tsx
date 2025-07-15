import { useGetSections } from "../../hooks/useSections";
import type { Section } from "../../types/Section";
import SectionCard from "./SectionCard";

interface Props {
  projectId: string;
}
function SectionsList({ projectId }: Props) {
  const { data: sections } = useGetSections(projectId);
  return (
    <div className="h-fit flex flex-row flex-wrap gap-4 justify-center items-center py-12 px-4">
      {sections.map((s: Section) => (
        <SectionCard key={s._id} section={s} />
      ))}
    </div>
  );
}

export default SectionsList;
