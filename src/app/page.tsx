import { GoogleSignIn } from "./features/auth/GoogleSignIn";
import { NavBar } from "./components/site/NavBar";
export default function Home() {
  return (
    <>
      <NavBar rightNav={<GoogleSignIn/>}/>
    </>
  );
}
