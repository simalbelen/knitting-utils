import type { Section } from "../../types/Section";

interface Props {
  section: Section;
  current_row: number;
}
function SectionDetails({ section, current_row }: Props) {
  console.log(current_row);
  console.log(section.knit_mode.right_side_even_row);
  console.log((current_row + 1) % 2 === 0);
  return (
    <>
      <h1 className="text-2xl w-full flex justify-center items-center p-4">
        {section.knit_mode.knit_flat ? "Tejido en plano" : "Tejido en redondo"}
      </h1>
      <div className="bg-tertiary h-[2px]" />
      {section.knit_mode.knit_flat && (
        <div className="flex flex-col gap-2 text-lg px-10 py-4 ">
          <span>
            Pares:
            {section.knit_mode.right_side_even_row ? " Derecho" : " Revés"}
          </span>
          <span>
            Impares:
            {section.knit_mode.right_side_even_row ? " Revés" : " Derecho"}
          </span>
          <span>
            Vuelta actual:
            {section.knit_mode.right_side_even_row
              ? (current_row + 1) % 2 === 0
                ? " Derecho"
                : " Revés"
              : (current_row + 1) % 2 === 0
              ? " Revés"
              : " Derecho"}
          </span>
        </div>
      )}
      {section.notes != "" && (
        <>
          <div className="bg-tertiary h-[2px]" />
          <div className="border-2 border-tertiary rounded-xl p-2 my-4">
            <span className="underline">Notas: {section.notes}</span>
          </div>
        </>
      )}

      {/* <div className="border-2 border-tertiary rounded-xl p-2 my-4">
        <span className="underline">Leyenda: {section.notes}</span>
      </div> */}
      <div className="bg-tertiary h-[2px]" />
      <div className="w-full flex justify-center">
        <div className="w-fit bg-primary rounded-xl p-2 my-4">
          <span className="text-5xl">
            {((current_row / section.goal_row) * 100).toFixed(0)}%
          </span>
        </div>
      </div>
    </>
  );
}

export default SectionDetails;
