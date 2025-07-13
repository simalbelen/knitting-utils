import { useQuery } from "@tanstack/react-query";
import type { Section } from "../types/Section";
import SectionService from "../services/SectionService";

const fetchAllProjectSections = async (idProject: string): Promise<Section[]> => {
  const { data } = await SectionService.findAllInProject(idProject);
  return data;
};

export const useGetSections = (idProject: string) => {
  return useQuery<Section[], Error>({
    queryKey: ["sectionList"],
    queryFn: () => fetchAllProjectSections(idProject),
    initialData: [],
  });
};
