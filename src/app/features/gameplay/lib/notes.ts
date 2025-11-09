export function generateNotes(): Array<string>{
  const roundNotes = Array(10);

  for (let i=0; i<10; i++){
    const note = (Math.random() < 0.5) ? 'a' : 'b';
    roundNotes[i] = note;

  }

  return roundNotes;
}