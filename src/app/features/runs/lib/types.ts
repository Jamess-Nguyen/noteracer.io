export type RunStore = {
  runHistory: run[];
  addRun: (r: run) => void;
  replaceRunHistory: (r: run[]) => void;
};

export type run = {
  notes: string[];
  date: Date;
  runTime: number;
}