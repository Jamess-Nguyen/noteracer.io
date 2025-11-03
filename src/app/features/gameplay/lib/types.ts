export type CellState = "neutral" | "wrong" | "right";
export type RoundStatus = "idle" | "running" | "done";
export type GameplayState = {
  notes: string[];
  answers: string[];
  states: CellState[];
  currentIndex: number;
  status: RoundStatus;

  setAnswer: (i: number, value: string) => void;
  setState: (i: number, s: CellState) => void;
  advanceInput: () => void;
  resetRound: (notes: string[]) => void;
};

export type NoteCellProps = {
  noteToken: string
  userInput: string
  noteState: "neutral" | "wrong" | "right"
  noteEnabled: boolean
  ariaLabel: string
};
