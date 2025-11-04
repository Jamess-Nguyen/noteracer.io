"use client";

import Image from "next/image";
import { useGameplayStore } from "@/app/features/gameplay/lib/store";
import type { NoteCellOwnProps, CellState } from "@/app/features/gameplay/lib/types";

export function NoteCell({ index, ariaLabel }: NoteCellOwnProps) {
  const noteToken = useGameplayStore(s => s.notes[index] ?? "");
  const value = useGameplayStore(s => s.answers[index] ?? "");
  const state: CellState = useGameplayStore(s => s.states[index]);
  const currentIndex = useGameplayStore(s => s.currentIndex);

  const setAnswer = useGameplayStore(s => s.setAnswer);
  const setState = useGameplayStore(s => s.setState);
  const advanceInput = useGameplayStore(s => s.advanceInput);

  const noteEnabled = index === currentIndex;

  const handleChange = (next: string) => {
    setAnswer(index, next);

    if (next === ""){
      return;
    }
    if (next === noteToken) {
      setState(index, "right");
      advanceInput();
    } else {
      setState(index, "wrong");
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="relative aspect-square w-full overflow-hidden bg-amber-200">
        <Image src="/vercel.svg" alt={noteToken} fill className="object-contain" />
      </div>

      <div className="relative aspect-square w-full overflow-hidden bg-amber-200">
        <input
          aria-label={ariaLabel}
          disabled={!noteEnabled}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          className="h-full w-full text-center outline-none"
        />
      </div>
    </div>
  );
}
