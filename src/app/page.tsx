import { GoogleSignIn } from "./components/auth/GoogleSignIn";
import { TwoItemNavBar } from "./components/navigation/TwoItemNavBar";
import { GamePlayHeader } from "./features/gameplay/components/GamePlayHeader";

export default function Home() {
  return (
    <>
      <TwoItemNavBar 
        leftLogo={"NoteRacer.io"}
        rightNav={<GoogleSignIn/>}
      />
    </>
  );
}
