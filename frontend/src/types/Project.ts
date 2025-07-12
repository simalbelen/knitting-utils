export interface Project {
    _id?: string;
    title: string;
    designer: string;
    status: "created"|"inProgress"|"finished"
  }
  