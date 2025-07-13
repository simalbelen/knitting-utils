import { API } from "./config";
import type { Section } from "../types/Section";

const PREFIX = "/api/sections";

const findAllInProject = async (id_project:string) => {
  return await API.get<Section[]>(`${PREFIX}/project/${id_project}/`);
};

const findOne = async (id: string) => {
  return await API.get<Section>(`${PREFIX}/${id}/`);
};

const createOne= async (section: Section) => {
  return await API.post<Section>(`${PREFIX}`, section);
};

const duplicateOne= async (id: string) => {
  return await API.post<Section>(`${PREFIX}/${id}/duplicate`);
};

const updateOne= async (id:string, section: Section) => {
  return await API.put<Section>(`${PREFIX}/${id}/`, section);
};

const deleteOne= async (id: string) => {
  return await API.delete<void>(`${PREFIX}/${id}/`);
};

const updateCurrentRow= async (id:string, row: number) => {
  return await API.patch<Section>(`${PREFIX}/${id}/row?row=${row}`);
};

const ProjectService = {
  findAllInProject,
  findOne,
  createOne,
  deleteOne,
  updateOne,
  updateCurrentRow,
  duplicateOne
};

export default ProjectService;
