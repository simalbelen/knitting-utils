import { API } from "./config";
import type { Project } from "../types/Project";

const PREFIX = "/api/projects";

const findAll = async () => {
  return await API.get<Project[]>(`${PREFIX}/`);
};

const findOne = async (id: string) => {
  return await API.get<Project>(`${PREFIX}/${id}`);
};

const createOne= async (project: Project) => {
  return await API.post<Project>(`${PREFIX}/`, project);
};

const updateOne= async (id:string, project: Project) => {
  return await API.put<Project>(`${PREFIX}/${id}`, project);
};

const ProjectService = {
  findAll,
  findOne,
  createOne,
  updateOne
};

export default ProjectService;
