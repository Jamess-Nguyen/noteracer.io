"use client";

import { useGameplayStore } from "@/app/features/gameplay/lib/store";


export function GamePlayInput(){
    const currentIndex  = useGameplayStore((s) => { return s.currentIndex });
    const currentNote   = useGameplayStore((s) => { return s.notes[currentIndex] });
    const currentAnswer = useGameplayStore((s) => { return s.answers[currentIndex] });
    const currentStates = useGameplayStore((s) => { return s.states[currentIndex] });

    const setAnswer     = useGameplayStore((s) => { return s.setAnswer });
    const setState      = useGameplayStore((s) => { return s.setState });
    const advanceInput  = useGameplayStore((s) => { return s.advanceInput });
    const resetRound    = useGameplayStore((s) => { return s.resetRound });

    const gamePlayInput = (
        <input className="bg-white"/>
    );

    return (
        gamePlayInput
    );
}