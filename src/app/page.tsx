import { GoogleSignIn } from "./components/auth/GoogleSignIn";
import { TwoItemNavBar } from "./components/navigation/TwoItemNavBar";
import { GamePlayManager } from "./features/gameplay/components/GamePlayManager";
import { RunHistory } from "./features/runs/components/RunHistory";

export default function Home() {
  return (
    <>
      <TwoItemNavBar
        leftLogo={"NoteRacer.io"}
        //rightNav={<GoogleSignIn/>}
        rightNav={<b>Client Mode</b>}
      />
      <div className="mx-auto max-w-screen-lg px-6">
        <GamePlayManager />
      </div>
      <div className="mx-auto max-w-screen-lg px-6">
        <RunHistory />
      </div>
    </>
  );
}
