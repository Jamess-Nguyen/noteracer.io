export function generateNotes(): Array<string>{
  const roundNotes = Array(10);

  for (let i=0; i<10; i++){
    const note = (Math.random() < 0.5) ? 'a' : 'b';
    roundNotes[i] = note;

  }
  roundNotes[0] = 'e';
  roundNotes[1] = 'g';
  roundNotes[2] = 'b';
  roundNotes[3] = 'd';
  roundNotes[4] = 'f';
  roundNotes[5] = 'f';
  roundNotes[6] = 'd';
  roundNotes[7] = 'e';
  roundNotes[8] = 'g';
  roundNotes[9] = 'b';

  return roundNotes;
}