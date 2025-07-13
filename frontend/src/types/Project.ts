interface Gauge {
  needle: string;
  stitches?: number;
  rows?: number;
}

export type Project = {
  _id?: string;
  title: string;
  designer: string;
  gauge: Gauge;
  status: "created" | "inProgress" | "finished";
}
