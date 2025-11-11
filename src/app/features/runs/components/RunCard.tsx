import { run } from "@/app/features/runs/lib/types"

function formatYMD(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}/${m}/${d}`;
}

function RunCard({notes, date, runTime}: run){
  const runNotes = (
    <p className="flex justify-between my-auto">
      <b>[</b>
      {notes.map((note, idx) => { return (
        <b key={idx}>{note}</b>); 
        })}
      <b>]</b>
    </p>
  );

  const runTimeStamps = (
    <div className="flex flex-col justify-end">
      <time className="w-full text-right">
        <b>Run Date: {formatYMD(date)}</b>
      </time>
      <p className="w-full text-right">
        <b>Notes Per Min: {runTime}</b>
      </p>
    </div>    
  );
  const runCard = (
    <article className="grid grid-cols-1 md:grid-cols-[7.5fr_2.5fr] gap-4 mt-5">
      {runNotes}
      {runTimeStamps}
    </article >
  );
  return runCard;
}

export { RunCard };