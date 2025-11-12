import { run } from "@/app/features/runs/lib/types";
import { formatYMD, calculateWPM } from "@/app/features/runs/lib/formatting";

function RunCard({ notes, date, runTime }: run) {
  const runNotes = (
    <p className="flex justify-between my-auto">
      <b>[</b>
      {notes.map((note, idx) => { return (<b key={idx}>{note}</b>); })}
      <b>]</b>
    </p>
  );

  const runTimeStamps = (
    <div className="flex flex-col justify-end">
      <time className="w-full text-right">
        <b>Run Date: {formatYMD(date)}</b>
      </time>
      <p className="w-full text-right">
        <b>Notes Per Min: {calculateWPM(runTime)}</b>
      </p>
    </div>
  );

  const runCard = (
    <div className="mt-15">
      <article className="grid grid-cols-1 md:grid-cols-[7.5fr_2.5fr] gap-4">
        {runNotes}
        {runTimeStamps}
      </article >
    </div>
  );
  return runCard;
}

export { RunCard };