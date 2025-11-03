import { GoogleSignIn } from "./components/auth/GoogleSignIn";
import { TwoItemNavBar } from "./components/navigation/TwoItemNavBar";

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
