export function formatYMD(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}/${m}/${d}`;
}

export function calculateWPM(time: number): string{
  if (time <= 0 || !Number.isFinite(time)) return "0";
  const notes = 10;
  const minutes = time / 60000;
  const wpm = Math.round(notes / minutes).toString();
  const string_wpm = wpm.toString();
  return string_wpm;
}
