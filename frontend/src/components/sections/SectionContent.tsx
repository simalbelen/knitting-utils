import { useParams } from "react-router-dom";
import { PlusIcon } from "../icons/PlusIcon";
import { MinusIcon } from "../icons/MinusIcon";
import RowNumber from "../atoms/RowNumber";
import type { Section } from "../../types/Section";
import { useSectionCounter } from "../../hooks/useSectionCounter";
import { useEffect } from "react";
import SectionDetails from "./SectionDetails";

interface Props {
  section: Section;
}
function SectionContent({ section }: Props) {
  const { id } = useParams();
  const {
    counter,
    setCounter,
    handleAddOne,
    handleSubstractOne,
    handleTouchRow,
  } = useSectionCounter(id);

  useEffect(() => {
    if (section) setCounter(section.current_row ?? 0);
  }, [section]);

  const rows = Array.from({ length: section?.goal_row ?? 0 }, (_, i) => i + 1);

  return (
    section && (
      <div className="flex h-full">
        <div className="flex-1 bg-accent px-4 text-tertiary">
          <SectionDetails section={section} current_row={counter} />
        </div>
        <div className="flex-3 flex w-full justify-center items-center flex-row">
          <div
            className="bg-secondary h-full flex justify-center items-center flex-1/8 text-accent"
            onClick={handleSubstractOne}
          >
            <MinusIcon width={150} height={150} />
          </div>
          <div className="flex justify-center items-center gap-6 flex-6/8 bg-secondary py-6">
            <div className="flex-1 p-14 w-full max-h-[600px] flex flex-wrap justify-center items-center gap-6 bg-accent rounded-3xl overflow-y-auto scroll-hidden">
              {rows.map((n) => (
                <RowNumber
                  key={n}
                  value={n}
                  maxValue={counter}
                  setMaxValue={handleTouchRow}
                />
              ))}
            </div>
          </div>
          <div
            className="bg-secondary h-full flex justify-center items-center flex-1/8 text-accent"
            onClick={handleAddOne}
          >
            <PlusIcon width={150} height={150} />
          </div>
        </div>
      </div>
    )
  );
}

export default SectionContent;
