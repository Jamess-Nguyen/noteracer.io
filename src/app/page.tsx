import { GoogleSignIn } from "./components/auth/GoogleSignIn";
import { TwoItemNavBar } from "./components/navigation/TwoItemNavBar";
import { GamePlayManager } from "./features/gameplay/components/GamePlayManager";
import { RunCard } from "./features/runs/components/RunCard";
export default function Home() {
  return (
    <>
      <TwoItemNavBar 
        leftLogo={"NoteRacer.io"}
        rightNav={<GoogleSignIn/>}
      />
      <div className="mx-auto max-w-screen-lg px-6">
        <GamePlayManager/>
      </div>
      <div className="mx-auto max-w-screen-lg px-6">
      <RunCard 
        notes={["a", "b", "a", "b","a", "b", "a", "b", "a",  "b", "a"]}
        date={new Date()}
        runTime={100}
      />
      <RunCard 
        notes={["a", "b", "a", "b","a", "b", "a", "b", "a",  "b", "a"]}
        date={new Date()}
        runTime={100}
      />
      <RunCard 
        notes={["a", "b", "a", "b","a", "b", "a", "b", "a",  "b", "a"]}
        date={new Date()}
        runTime={100}
      />
      </div>
     </>
  );
}
