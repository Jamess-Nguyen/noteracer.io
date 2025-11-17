"use client";

import { create } from "zustand";
import { RunStore, run } from "@/app/features/runs/lib/types"

export const useRunStore = create<RunStore>((set, get) => ({
  runHistory: [] as run[],

  addRun: (r: run) => 
    set((s) => ({
      runHistory: [r, ...s.runHistory],
    })),

  replaceRunHistory: (r: run[]) =>
    set((s) => ({
      runHistory: r,
    })),
    
}));