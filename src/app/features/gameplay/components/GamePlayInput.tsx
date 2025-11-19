"use client";

import { useGameplayStore } from "@/app/features/gameplay/lib/store";
import { useEffect, useRef } from "react";

export function GamePlayInput() {
  const currentIndex = useGameplayStore((s) => { return s.currentIndex });
  const currentNote = useGameplayStore((s) => { return s.notes[s.currentIndex] ?? "" });
  const currentStatus = useGameplayStore((s) => { return s.status });
  const setAnswer = useGameplayStore((s) => { return s.setAnswer });
  const setState = useGameplayStore((s) => { return s.setState });
  const advanceInput = useGameplayStore((s) => { return s.advanceInput });

  const stateRef = useRef({
    currentIndex,
    currentNote,
    currentStatus,
    setAnswer,
    setState,
    advanceInput,
  });

  useEffect(() => {
    stateRef.current = {
      currentIndex,
      currentNote,
      currentStatus,
      setAnswer,
      setState,
      advanceInput,
    };
  }, [currentIndex, currentNote, currentStatus, setAnswer, setState, advanceInput]);

  useEffect(() => {

    function ReadInput(char: string) {
      const { currentStatus, currentNote, currentIndex, setState, setAnswer, advanceInput } = stateRef.current;

      const cur_input = char;
      const cur_length = cur_input.length;
      const expectedNote = currentNote[0];

      if (cur_length < 1) {
        return;
      }

      if (cur_input === expectedNote) {
        setState(currentIndex, "right");
        setAnswer(currentIndex, cur_input);
        advanceInput();
        console.log(`currentIndex: ${currentIndex}, currentStatus: ${currentStatus}, expectedNote: ${expectedNote}`);
      }

      if (cur_input !== expectedNote) {
        setState(currentIndex, "wrong");
        setAnswer(currentIndex, cur_input);
        console.log(`currentIndex: ${currentIndex}, currentStatus: ${currentStatus}, expectedNote: ${expectedNote}`);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (stateRef.current.currentStatus !== "running") {
        return;
      }

      const key = event.key.toLowerCase();
      ReadInput(key);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center gap-2 mx-auto mt-5">
      <b className="w-full max-w-sm mt-4">
        Press any key to start the game!
      </b>
    </div>
  );
}
