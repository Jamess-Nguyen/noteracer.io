"use client";

import { useSession } from "next-auth/react";
import { DEFAULT_USERNAME } from "@/app/features/gameplay/constants";
import { processName } from "@/app/features/gameplay/lib/formatting";
import { useGameplayStore } from "@/app/features/gameplay/lib/store";
import { useEffect } from "react";

export function GamePlayHeader() {
  const { status, data } = useSession();
  const rawName    = (status === "authenticated" ? data?.user?.name : null) ?? DEFAULT_USERNAME;
  const firstName  = processName(rawName);

  const timerMs    = useGameplayStore(s => { return s.timerMs });
  const gameStatus = useGameplayStore(s => { return s.status });
  const setTimerMs = useGameplayStore(s => { return s.setTimer });

  useEffect(() => {
    if (gameStatus !== "running") return;

    let frame = 0;
    const start = performance.now() - timerMs;

    const tick = (t: number) => {
      setTimerMs(t - start);
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [gameStatus, setTimerMs, timerMs]);

  const secStr = (Math.max(0, timerMs) / 1000).toFixed(2);
  const secLabel = `${secStr} seconds`;

  return (
    <header className="flex mx-auto items-center justify-between m-4">
      <p><b>Hi {firstName}</b></p>
      <time
        role="timer"
        aria-label="Elapsed time in seconds"
        dateTime={`PT${secStr}S`}
      >
        <b>{secLabel}</b>
      </time>
    </header>
  );
}
