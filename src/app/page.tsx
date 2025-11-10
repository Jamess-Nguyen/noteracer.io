import { GoogleSignIn } from "./components/auth/GoogleSignIn";
import { TwoItemNavBar } from "./components/navigation/TwoItemNavBar";
import { GamePlayManager } from "./features/gameplay/components/GamePlayManager";

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
     </>
  );
}
