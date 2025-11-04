"use client";

import Image from "next/image";
import { useGameplayStore } from "@/app/features/gameplay/lib/store";
import type { NoteCellOwnProps, CellState } from "@/app/features/gameplay/lib/types";

export function NoteCell({ index, ariaLabel }: NoteCellOwnProps) {
  const noteToken = useGameplayStore((s) => { return s.notes[index] });
  const value = useGameplayStore((s) => { return s.answers[index] });
  const state: CellState = useGameplayStore((s) => { return s.states[index] });
  const currentIndex = useGameplayStore((s) => { return s.currentIndex });

  const setAnswer = useGameplayStore((s) => { return s.setAnswer });
  const setState = useGameplayStore((s) => { return s.setState });
  const advanceInput = useGameplayStore((s) => { return s.advanceInput });

  const noteEnabled = index === currentIndex;

  const readNoteInput = (next: string) => {
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
          onChange={(e) => readNoteInput(e.target.value)}
          className="h-full w-full text-center outline-none"
        />
      </div>
    </div>
  );
}
