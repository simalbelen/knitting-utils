import { useState } from "react";
import { useParams } from "react-router-dom";
import { PlusCircleIcon } from "../components/icons/PlusCircleIcon";
import { MinusCircleIcon } from "../components/icons/MinusCircleIcon";
import RowNumber from "../components/RowNumber";

function ProjectPage() {
  const { id } = useParams();
  const [counter, setCounter] = useState<number>(0);
  const [goal, setGoal] = useState<number>(42);

  const rows = Array.from({ length: goal }, (_, i) => i + 1);

  const handleAddOne = () => {
    setCounter(counter + 1);
  };

  const handleSubstractOne = () => {
    if (counter - 1 <= 0) {
      setCounter(0);
    } else {
      setCounter(counter - 1);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="w-full flex-1">
        <h1 className="text-4xl p-8 flex justify-center items-center">
          Projecto {id}
        </h1>
      </div>
      <div className="flex flex-10 w-full justify-center items-center flex-row border-y-4 border-purple-500">
        {/* <ProgressBar value={counter} maxValue={goal}/> */}
        <div
          className="bg-purple-500 h-full flex justify-center items-center flex-1/8"
          onClick={handleSubstractOne}
        >
          <MinusCircleIcon width={150} height={150} />
        </div>
        <div className="flex justify-center items-center gap-6 flex-6/8">
          <div className="p-16 w-full flex flex-wrap justify-center items-center gap-6">
            {" "}
            {rows.map((n) => (
              <RowNumber
                key={n}
                value={n}
                maxValue={counter}
                setMaxValue={setCounter}
              />
            ))}
          </div>
        </div>
        <div
          className="bg-purple-500 h-full flex justify-center items-center flex-1/8"
          onClick={handleAddOne}
        >
          <PlusCircleIcon width={150} height={150} />
        </div>
      </div>
    </div>
  );
}

export default ProjectPage;
