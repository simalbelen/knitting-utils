import { API } from "./config";
import type { Project } from "../types/Project";

const PREFIX = "/api/projects";

const findAll = async () => {
  return await API.get<Project[]>(`${PREFIX}`);
};

const findOne = async (id: string) => {
  return await API.get<Project>(`${PREFIX}/${id}`);
};

const ProjectService = {
  findAll,
  findOne
};

export default ProjectService;
