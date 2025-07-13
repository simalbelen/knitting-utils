import { useGetSections } from "../../hooks/useSections";
import type { Section } from "../../types/Section";
import SectionCard from "./SectionCard";

interface Props {
  projectId: string;
}
function SectionsList({ projectId }: Props) {
  const { data: sections } = useGetSections(projectId);
  return (
    <div className="h-fill">
      <div className="flex flex-row flex-wrap gap-4 justify-center items-center p-4 h-full overflow-y-auto scroll-hidden">
        {sections.map((s: Section) => (
          <SectionCard key={s._id} section={s} />
        ))}
      </div>
    </div>
  );
}

export default SectionsList;
