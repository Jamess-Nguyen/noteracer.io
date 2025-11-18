export function generateNotes(count = 10): string[] {
  const notes = [
    'e1', 'e2',
    'f1', 'f2',
    'g1',
    'a1',
    'b1',
    'c1',
    'd1' 
  ];
  const randomNotes = Array.from({ length: count }, () => notes[Math.floor(Math.random() * notes.length)]);
  return randomNotes;
}