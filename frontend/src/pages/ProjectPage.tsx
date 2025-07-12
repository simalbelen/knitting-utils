import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PlusIcon } from "../components/icons/PlusIcon";
import { MinusIcon } from "../components/icons/MinusIcon";
import RowNumber from "../components/RowNumber";
import type { Project } from "../types/Project";
import ProjectService from "../services/ProjectService";
import PageTitle from "../components/PageTitle";

function ProjectPage() {
  const { id } = useParams();
  const [counter, setCounter] = useState<number>(0);
  const [goal, setGoal] = useState<number>(0);

  const [project, setProject] = useState<Project>();
  const fetchProject = async () => {
    if (id) {
      const { data } = await ProjectService.findOne(id);
      setProject(data);
      setCounter(data.current_row);
      setGoal(data.goal_row);
    }
  };

  const updateCounter = async (row: number) => {
    if (id) {
      try {
        await ProjectService.updateCurrentRow(id, row);
      } catch (e: any) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    fetchProject();
  }, [id]);

  useEffect(() => {
    console.log(counter, goal);
  }, [counter, goal]);

  const rows = Array.from({ length: goal }, (_, i) => i + 1);

  const handleAddOne = () => {
    updateCounter(counter + 1);
    setCounter(counter + 1);
  };

  const handleSubstractOne = () => {
    if (counter - 1 <= 0) {
      updateCounter(0);
      setCounter(0);
    } else {
      updateCounter(counter - 1);
      setCounter(counter - 1);
    }
  };

  const handleTouchRow = (row: number) => {
    updateCounter(row);
    setCounter(row);
  };

  return (
    <div className="flex flex-col h-svh bg-secondary">
      <PageTitle title={project?.title ?? ""} />

      <div className="flex flex-10 w-full justify-center items-center flex-row">
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
  );
}

export default ProjectPage;
