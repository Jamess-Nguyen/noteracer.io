"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { run } from "@/app/features/runs/lib/types";
import { RunCard } from "@/app/features/runs/components/RunCard";
import { useRunStore } from "@/app/features/runs/lib/store";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";

const PAGE_SIZE = 3;

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

function fetchGuestRunHistory() {
  return useRunStore((s) => { return s.runHistory; });
}

function RunHistory() {
  const { status } = useSession();
  const isAuthed = (status === "authenticated");
  const guestRuns = fetchGuestRunHistory();

  const { data: serverRunHistory = [], isLoading } = useQuery({
    queryKey: ["runs"],
    queryFn: fetchAuthRunHistory,
    enabled: (isAuthed === true),
  });

  let allRuns = [] as run[] | [];
  if (isAuthed === true) {
    allRuns = serverRunHistory;
  }
  else {
    allRuns = guestRuns;
  }

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const visibleRuns = useMemo(
    () => (allRuns ?? []).slice(0, visibleCount),
    [allRuns, visibleCount]
  );

  useEffect(() => {
    if (sentinelRef.current === null) {
      return;
    }
    if (allRuns.length === 0 || visibleCount >= allRuns.length) {
      return;
    }

    const io = new IntersectionObserver((entries) => {

      if (entries[0].isIntersecting) {
        setVisibleCount((n) => Math.min(n + PAGE_SIZE, allRuns!.length));
      }
    }, { threshold: 1.0 });

    io.observe(sentinelRef.current);
    return () => io.disconnect();
  }, [visibleCount, allRuns]);

  const runHistory = visibleRuns.map((run, idx) => {
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

  return (
    <>
      <b className="flex w-full justify-center mt-15">{(runHistory.length > 0) ? "Run History" : ""}</b>
      <div>{runHistory}</div>
      <div ref={sentinelRef} className="h-8" aria-hidden />
      {allRuns && visibleCount < allRuns.length ? (
        <p className="text-center text-sm opacity-60">Loading...</p>
      ) : (
        <></>
      )}
    </>
  );
}

export { RunHistory };
