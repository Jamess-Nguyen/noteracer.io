"use client";

import { useSession } from "next-auth/react";
import { DEFAULT_USERNAME } from "@/app/features/gameplay/constants";
import { processName, formatSecondsMillis } from "@/app/features/gameplay/lib/formatting";

export function GamePlayHeader({timeMs} : {timeMs: number}){
  const {status, data} = useSession();
  const rawName = (status === "authenticated" ? data.user?.name : null) ?? DEFAULT_USERNAME;
  const firstName = processName(rawName);
  const { totalSeconds, millis, timeLabel } = formatSecondsMillis(Math.max(0, timeMs));

  const gamePlayHeader = (
    <header className="flex mx-auto items-center justify-between">
      <p>Hi {firstName}</p>
      <time
        role="timer"
        aria-label="Elapsed time in seconds and milliseconds"
        dateTime={`PT${totalSeconds}.${String(millis).padStart(3, "0")}S`}
      >
        {timeLabel}
      </time>
    </header>
  );
  return gamePlayHeader;
}