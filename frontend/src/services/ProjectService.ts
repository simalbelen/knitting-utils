import { API } from "./config";
import type { Project } from "../types/Project";

const PREFIX = "/api/projects";

const findAll = async () => {
  return await API.get<Project[]>(`${PREFIX}/`);
};

const createOne= async (project: Project) => {
  return await API.post<Project>(`${PREFIX}/`, project);
};

const updateOne= async (id:string, project: Project) => {
  return await API.put<Project>(`${PREFIX}/${id}`, project);
};

const ProjectService = {
  findAll,
  createOne,
  updateOne
};

export default ProjectService;
