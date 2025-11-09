export type CellState = "neutral" | "wrong" | "right";
export type RoundStatus = "idle" | "running" | "done";

export type GameplayState = {
  notes: string[];
  answers: string[];
  states: CellState[];
  currentIndex: number;
  status: RoundStatus;
  timerMs: number

  setAnswer: (i: number, value: string) => void;
  setState: (i: number, s: CellState) => void;
  advanceInput: () => void;
  setTimer: (time : number) => void;
  resetRound: (notes: string[]) => void;
};

export type NoteCellOwnProps = {
  index: number;
  ariaLabel: string;
};
