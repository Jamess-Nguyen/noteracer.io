"use client";

import { useGameplayStore } from "@/app/features/gameplay/lib/store";
import type { ChangeEvent } from "react";

export function GamePlayInput() {
  const currentIndex = useGameplayStore((s) => { return s.currentIndex });
  const currentNote = useGameplayStore((s) => { return s.notes[s.currentIndex] ?? "" });

  const currentStatus = useGameplayStore((s) => { return s.status });

  const setAnswer = useGameplayStore((s) => { return s.setAnswer });
  const setState = useGameplayStore((s) => { return s.setState });
  const advanceInput = useGameplayStore((s) => { return s.advanceInput });

  function ReadInput(event: ChangeEvent<HTMLInputElement>) {
    const cur_input = event.currentTarget.value;
    const cur_length = event.currentTarget.value.length;

    const expectedNote = currentNote[0];

    if (cur_length < 1) {
      return;
    };

    // This probably shouldn't handle advancing indexes
    if (cur_input === expectedNote) {
      setState(currentIndex, "right");
      setAnswer(currentIndex, cur_input);
      advanceInput();
      console.log(`currentIndex: ${currentIndex}, currentStatus: ${currentStatus}`);
      event.currentTarget.value = "";
    };

    if (cur_input !== expectedNote) {
      setState(currentIndex, "wrong");
      setAnswer(currentIndex, cur_input);
      console.log(`currentIndex: ${currentIndex}, currentStatus: ${currentStatus}`);
      event.currentTarget.value = "";
    };

  };

  const gamePlayInput = (
    <input className="bg-white border-4 border-black" onChange={(e) => { return ReadInput(e) }} />
  );

  const tempInput = (
    <div className="flex flex-col items-center justify-center text-center gap-2 mx-auto mt-5">
      <b>Click on the text box and start inputting notes!</b>
      <b>I'll write a better input system once I get more formal music training</b>
      <div className="w-full max-w-sm mt-4">
        {gamePlayInput}
      </div>
    </div>
  )
  return tempInput;

}