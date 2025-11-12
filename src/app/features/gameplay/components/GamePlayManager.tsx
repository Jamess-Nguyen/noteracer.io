"use client";

import { NoteCell } from "./NoteCell";
import { useGameplayStore } from "@/app/features/gameplay/lib/store";
import { GamePlayInput } from "./GamePlayInput";
import { useEffect, useRef } from "react";
import { generateNotes } from "../lib/notes";
import { GamePlayHeader } from "./GamePlayHeader";
import { useRunStore } from "@/app/features/runs/lib/store";
import { run } from "@/app/features/runs/lib/types"
import { useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";

async function submitServerCompletedRun(completed_run: run, qc: any) {
  try {
    const res = await fetch("/api/v1/runs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        notes: completed_run.notes,
        date: completed_run.date.toISOString(),
        runTime: Math.round(completed_run.runTime),
      }),
    });

    if (res.ok === false) {
      const body = await res.text();
      console.error("POST /api/v1/runs failed:", body);
    }

    const { runHistory } = useRunStore.getState();
    await qc.invalidateQueries({ queryKey: ["runs"] });
    console.log(runHistory);
  }
  catch (error) {
    console.error("POST RUN ERROR:", error);
  }
}

export function GamePlayManager() {
  const addRun = useRunStore((s) => { return s.addRun });
  const resetRound = useGameplayStore((s) => { return s.resetRound });
  const qc = useQueryClient();
  useEffect(() => {
    const run_notes = generateNotes();
    resetRound(run_notes);
  }, [resetRound]);

  const gameStatus = useGameplayStore((s) => { return s.status });
  const postedRef = useRef(false);
  const { status, data } = useSession();
  const email = data?.user?.email ?? null;
  const isAuthed = (status === "authenticated") && (email !== null);

  useEffect(() => {
    if (gameStatus !== "done") { return; }
    if (postedRef.current === true) { return; }
    postedRef.current = true;

    const { notes, timerMs } = useGameplayStore.getState();

    const completed_run: run = {
      notes: notes,
      runTime: timerMs,
      date: new Date(),
    };

    if (isAuthed === true) {
      submitServerCompletedRun(completed_run, qc);
    }
    else {
      addRun(completed_run);
    }

    const run_notes = generateNotes();
    resetRound(run_notes);
    postedRef.current = false;
  }, [gameStatus, resetRound]);

  const noteCount = useGameplayStore(s => s.notes.length);

  const currentNotes = (
    <div className="grid grid-cols-2 sm:grid-cols-5">
      {Array.from({ length: noteCount }, (_, i) => (
        <NoteCell key={i} index={i} ariaLabel={`Note ${i + 1} of ${noteCount}`} />
      ))}
    </div>
  );

  return (
    <div>
      <GamePlayHeader />
      {currentNotes}
      <div className="w-full h-[100px] flex items-center justify-center">
        <GamePlayInput />
      </div>
    </div>
  );
}
