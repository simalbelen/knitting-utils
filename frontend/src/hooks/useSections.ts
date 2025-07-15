import { useQuery } from "@tanstack/react-query";
import type { Section } from "../types/Section";
import SectionService from "../services/SectionService";

const fetchAllProjectSections = async (projectId: string): Promise<Section[]> => {
  const { data } = await SectionService.findAllInProject(projectId);
  return data;
};

export const useGetSections = (projectId: string) => {
  return useQuery<Section[], Error>({
    queryKey: ["sectionList"],
    queryFn: () => fetchAllProjectSections(projectId),
    initialData: [],
  });
};
