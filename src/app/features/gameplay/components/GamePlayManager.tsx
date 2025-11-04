"use client";

import * as React from "react";
import { NoteCell } from "./NoteCell";
import { useGameplayStore } from "@/app/features/gameplay/lib/store";
import { generateNotes } from "@/app/features/gameplay/lib/notes";

export function GamePlayManager() {
  const resetRound = useGameplayStore((s) => s.resetRound);
  const bArray = ["b","b","b","b","b","b","b","b","b"];
  resetRound(bArray);
  return (
    <div className="p-4">
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {Array.from({ length: 10 }, (_, i) => (
          <NoteCell key={i} index={i} ariaLabel={`Note ${i + 1} of 10`} />
        ))}
      </div>
    </div>
  );
}
