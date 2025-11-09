"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useGameplayStore } from "@/app/features/gameplay/lib/store";
import type { NoteCellOwnProps } from "@/app/features/gameplay/lib/types";

export function NoteCell({ index, ariaLabel }: NoteCellOwnProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const noteToken = useGameplayStore((s) => {return s.notes[index]});
  const noteState = useGameplayStore((s) => {return s.states[index]});
  
  if (!mounted || !noteToken) {
    return (
      <div
        className="relative aspect-square w-full overflow-hidden bg-amber-200 animate-pulse"
        aria-label={ariaLabel}
      />
    );
  }

  const notePath = `/notes/${noteState}/${noteToken}.png`;

  return (
    <div className="relative aspect-square w-full overflow-hidden bg-amber-200" aria-label={ariaLabel}>
      <Image src={notePath} alt={noteToken} fill />
    </div>
  );
}
