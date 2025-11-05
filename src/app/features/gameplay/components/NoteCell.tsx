"use client";

import Image from "next/image";
import { useGameplayStore } from "@/app/features/gameplay/lib/store";
import type { NoteCellOwnProps } from "@/app/features/gameplay/lib/types";

export function NoteCell({ index, ariaLabel }: NoteCellOwnProps) {
  const noteToken = useGameplayStore((s) => { return s.notes[index] });
  const notePath = `/${noteToken}.png`;
  return (
    <div className="relative aspect-square w-full overflow-hidden bg-amber-200" aria-label={ariaLabel}>
      <Image src={notePath} alt={noteToken} fill/>
    </div>
  );
}
