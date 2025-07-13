interface KnitMode {
  knit_flat: boolean;
  right_side_even_row: boolean;
}

interface AccentStitch {
    start_row: number;
    each_type: "even"|"odd"|"fixed"|"free"
    each_n_row?: number
    symbol: string;
    description: string;
    stitches: number[]
}

export type Section = {
  _id?: string;
  project: string;
  title: string;
  notes: string;
  current_row?: number;
  goal_row: number;
  knit_mode: KnitMode
  accent_stitches?: AccentStitch[]
}
