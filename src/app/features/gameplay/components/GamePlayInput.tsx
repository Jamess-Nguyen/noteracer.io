"use client";

import { useGameplayStore } from "@/app/features/gameplay/lib/store";
import type { ChangeEvent } from "react";

export function GamePlayInput(){
  const currentIndex  = useGameplayStore((s) => { return s.currentIndex });
  const currentNote   = useGameplayStore((s) => { return s.notes[s.currentIndex] ?? "" });

  const currentStatus = useGameplayStore((s) => { return s.status });

  const setAnswer     = useGameplayStore((s) => { return s.setAnswer });
  const setState      = useGameplayStore((s) => { return s.setState });
  const advanceInput  = useGameplayStore((s) => { return s.advanceInput });

  function ReadInput(event : ChangeEvent<HTMLInputElement>){
    const cur_input   = event.currentTarget.value;
    const cur_length  = event.currentTarget.value.length;
    const note_length = currentNote.length;

    if (cur_length < note_length){
      return;
    }

    if (cur_input === currentNote){
      setState(currentIndex, "right");
      setAnswer(currentIndex, cur_input);
      advanceInput();
      console.log(`currentIndex: ${currentIndex}, currentStatus: ${currentStatus}`);
    }

    if (cur_input !== currentNote){
      setState(currentIndex, "wrong");
      setAnswer(currentIndex, cur_input);
      console.log(`currentIndex: ${currentIndex}, currentStatus: ${currentStatus}`);
    }

  }

  const gamePlayInput = (
      <input className="bg-white" onChange={(e)=>{return ReadInput(e)}}/>
  );

  return gamePlayInput;

}