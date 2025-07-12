import { API } from "./config";
import type { Project } from "../types/Project";

const PREFIX = "/api/projects";

const findAll = async () => {
  return await API.get<Project[]>(`${PREFIX}/`);
};

const findOne = async (id: string) => {
  return await API.get<Project>(`${PREFIX}/${id}/`);
};

const updateCurrentRow = async (id: string, row: number) => {
  return await API.patch<Project>(`${PREFIX}/${id}/row?row=${row}/`);
};

const createOne= async (project: Project) => {
  return await API.post<Project>(`${PREFIX}/`, project);
};

const ProjectService = {
  findAll,
  findOne,
  updateCurrentRow,
  createOne
};

export default ProjectService;
