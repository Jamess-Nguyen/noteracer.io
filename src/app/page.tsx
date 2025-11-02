import { GoogleSignIn } from "./features/auth/GoogleSignIn";
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
