export function generateNotes(): Array<Number>{
  const roundNotes = Array(10);

  for (let i=0; i<10; i++){
    if (i%2==0) {
      roundNotes[i]="C";
    }
    else{
      roundNotes[i]="D";
    }
  }

  return roundNotes;
}