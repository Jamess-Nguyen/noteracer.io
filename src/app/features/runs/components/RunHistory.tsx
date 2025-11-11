"use client";

import { RunCard } from "@/app/features/runs/components/RunCard";
import { useRunStore } from "@/app/features/runs/lib/store";
import { Session } from "next-auth";

function RunHistory(){
  const allRuns = useRunStore((s) => { return s.runHistory; });

  const runHistory = allRuns.map((run, idx) => { 
    const currentRun = (
      <RunCard
        key={idx}
        notes={run.notes}
        date={run.date}
        runTime={run.runTime}
      />
    );
    return currentRun;
  });

  return (<>{runHistory}</>);
}

export { RunHistory };