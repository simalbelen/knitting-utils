import { useState } from "react";;
import SectionService from "../services/SectionService";

export const useSectionCounter = (id: string|undefined) => {
  const [counter, setCounter] = useState<number>(0);

  const updateCounter = async (row: number) => {
    if (id) {
      try {
        await SectionService.updateCurrentRow(id, row);
      } catch (e: any) {
        console.log(e);
      }
    }
  };

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

  return {
    counter,
    setCounter,
    handleAddOne,
    handleSubstractOne,
    handleTouchRow,
  };
};
