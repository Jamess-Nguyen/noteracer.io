export function generateNotes(count = 10): string[] {
  const notes = ['e', 'g', 'b', 'd', 'f'];
  const randomNotes = Array.from({ length: count }, () => notes[Math.floor(Math.random() * notes.length)]);
  return randomNotes;
}