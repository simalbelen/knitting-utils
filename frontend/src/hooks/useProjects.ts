"use client";

import { useQuery } from "@tanstack/react-query";
import type { Project } from "../types/Project";
import ProjectService from "../services/ProjectService";

const fetchAllProjects = async (): Promise<Project[]> => {
  const { data } = await ProjectService.findAll();
  return data;
};

export const useGetProjects = () => {
  return useQuery<Project[], Error>({
    queryKey: ["projectList"],
    queryFn: () => fetchAllProjects(),
    initialData: [],
  });
};
