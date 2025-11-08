"use client";

import { create } from "zustand";
import { GameplayState, CellState } from "@/app/features/gameplay/lib/types"
import { RoundStatus } from "@/app/features/gameplay/lib/types";

function makeArray<T>(len: number, value: T): T[] {
  return Array(len).fill(value);
}

export const useGameplayStore = create<GameplayState>((set, get) => ({
  notes: makeArray(10, ""),
  answers: makeArray(10, ""),
  states: makeArray<CellState>(10, "neutral"),
  currentIndex: 0,
  status: "idle",

  setAnswer: (idx, answer) =>
    set((s) => {
      const answers = s.answers.slice();
      answers[idx] = answer;
      if (s.status === "idle" && idx === 0 && answer.length > 0) {
        return { answers, status: "running" };
      }
      return { answers };
    }),

  setState: (idx, state) =>
    set((s) => {
      const states = s.states.slice();
      states[idx] = state;
      return { states };
    }),

  advanceInput: () =>
    set((s) => {
      const increment_index = s.currentIndex + 1;
      return {
        currentIndex: increment_index
      };
    }),

  resetRound: (notes) =>
    set(() => ({
      notes,
      answers: makeArray(10, ""),
      states: makeArray<CellState>(10, "neutral"),
      currentIndex: 0,
      status: "idle",
    })),
}));
