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
import { useQuery } from "@tanstack/react-query";

async function fetchAuthRunHistory(): Promise<run[]> {
  const res = await fetch("/api/v1/runs", { method: "GET" });
  if (res.ok === false) {
    throw new Error(await res.text());
  }
  const rows: Array<{ notes: string[]; runTimeMs: number; date: string }> = await res.json();
  const mapped: run[] = rows.map((r) => ({
    notes: r.notes,
    runTime: r.runTimeMs,
    date: new Date(r.date),
  }));
  mapped.sort((a, b) => b.date.getTime() - a.date.getTime());
  return mapped;
}

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
  const replaceRunHistory = useRunStore((s) => { return s.replaceRunHistory });

  const { data: serverRunHistory = [], isLoading } = useQuery({
    queryKey: ["runs"],
    queryFn: fetchAuthRunHistory,
    enabled: (isAuthed === true),
  });

  useEffect(() => {
    if (isAuthed && serverRunHistory) {
      replaceRunHistory(serverRunHistory);
    }
  }, [isAuthed, serverRunHistory]);

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

    addRun(completed_run);

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
      <div>{currentNotes}</div>
      <GamePlayInput />
    </div>
  );
}
