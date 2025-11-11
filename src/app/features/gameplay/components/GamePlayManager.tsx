"use client";

import { NoteCell } from "./NoteCell";
import { useGameplayStore } from "@/app/features/gameplay/lib/store";
import { GamePlayInput } from "./GamePlayInput";
import { useEffect } from "react";
import { generateNotes } from "../lib/notes";
import { GamePlayHeader } from "./GamePlayHeader";
import { useRunStore } from "@/app/features/runs/lib/store";
import { run } from "@/app/features/runs/lib/types"

export function GamePlayManager() {
  const addRun = useRunStore((s) => { return s.addRun });  
  const resetRound = useGameplayStore((s) => { return s.resetRound });
  useEffect(() => {
    const run_notes = generateNotes();
    resetRound(run_notes);
  },[resetRound]);

  const gameStatus = useGameplayStore((s) => { return s.status });
  useEffect(() => {
    if (gameStatus === "done") {
      const {notes, timerMs} = useGameplayStore.getState();

      const completed_run : run = {
        notes: notes,
        runTime: timerMs,
        date: new Date(),
      };
      addRun(completed_run);
      const {runHistory} = useRunStore.getState()
      console.log(runHistory)

      const run_notes = generateNotes();
      resetRound(run_notes);
    }
  }), [gameStatus, resetRound];

  const noteCount = useGameplayStore(s => s.notes.length);

  const currentNotes = (
    <div className="grid grid-cols-2 sm:grid-cols-5">
      {Array.from({ length: noteCount }, (_, i) => (
        <NoteCell key={i} index={i} ariaLabel={`Note ${i + 1} of ${noteCount}`} />
      ))}
    </div>
  )

  return (
    <div>
      <GamePlayHeader/>
      {currentNotes}
      <div className="w-full h-[100px] bg-amber-200 flex items-center justify-center">
        <GamePlayInput/>
      </div>
    </div>
  );
}
