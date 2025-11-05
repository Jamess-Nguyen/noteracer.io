"use client";

import { NoteCell } from "./NoteCell";
import { useGameplayStore } from "@/app/features/gameplay/lib/store";
import { GamePlayInput } from "./GamePlayInput";

export function GamePlayManager() {
  const currentIndex = useGameplayStore((s) => { return s.currentIndex });
  const setAnswer = useGameplayStore((s) => { return s.setAnswer });
  const setState = useGameplayStore((s) => { return s.setState });
  const advanceInput = useGameplayStore((s) => { return s.advanceInput });
  const resetRound = useGameplayStore((s) => { return s.resetRound });


  const notes = Array(10).fill("b");
  resetRound(notes);

  const sampleNotes = (
    <div className="p-4">
      <div className="grid grid-cols-2 sm:grid-cols-5">
        {Array.from({ length: 10 }, (_, i) => (
          <NoteCell key={i} index={i} ariaLabel={`Note ${i + 1} of 10`} />
        ))}
      </div>
    </div>
  )


  return (
    <div>
      {sampleNotes}
      <div className="w-full h-[100px] bg-amber-200 flex items-center justify-center">
        <GamePlayInput/>
      </div>
    </div>
  );
}
