"use client";

import { useGameplayStore } from "@/app/features/gameplay/lib/store";
import { GAME_STATUS } from "../constants";

export function GamePlayInput(){
  const currentIndex  = useGameplayStore((s) => { return s.currentIndex });
  const currentNote   = useGameplayStore((s) => { return s.notes[s.currentIndex] });

  const currentStatus = useGameplayStore((s) => { return s.status });

  const setAnswer     = useGameplayStore((s) => { return s.setAnswer });
  const setState      = useGameplayStore((s) => { return s.setState });
  const advanceInput  = useGameplayStore((s) => { return s.advanceInput });

  function ReadInput(event : any){
    const cur_input = event.target.value;
    
    if (cur_input==currentNote){
      console.log("CORRECT!")
      event.currentTarget.value = ""; 
      setState(currentIndex, "right");
      setAnswer(currentIndex, cur_input)
      advanceInput();
      console.log("after advance:", useGameplayStore.getState().currentIndex);
      event.currentTarget.value = ""; 
    }

    console.log(currentIndex, currentNote, currentStatus, cur_input);
  }

  const gamePlayInput = (
      <input className="bg-white" onChange={(e)=>{return ReadInput(e)}}/>
  );

  return (
      gamePlayInput
  );
}