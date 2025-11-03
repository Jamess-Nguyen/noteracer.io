"use client";

import { NoteCellProps } from "@/app/features/gameplay/lib/types"

export function NoteCell({
  noteToken,
  userInput,
  noteState,
  noteEnabled,
  ariaLabel,
  validateOnChange
}: NoteCellProps){

  const NoteCellResult = (
    <div>Note Cell</div>
  )
  return NoteCellResult
}