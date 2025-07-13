import { API } from "./config";
import type { Time } from "../types/Time";

const PREFIX = "/api/time";

const getProjectTotalTime = async (id_project: string) => {
  return await API.get<number>(`${PREFIX}/${id_project}/total`);
};

const getLastClockIn = async (id_project: string) => {
  return await API.get<Time>(`${PREFIX}/${id_project}`);
};

const clockIn = async (id_project: string) => {
  return await API.post<Time>(`${PREFIX}/${id_project}`);
};

const clockOut= async (id_project: string) => {
  return await API.put<Time>(`${PREFIX}/${id_project}`);
};

const ProjectService = {
  clockIn,
  clockOut,
  getLastClockIn,
  getProjectTotalTime
};

export default ProjectService;
