"use client";

import { useSession, signIn, SignInOptions, signOut, SignOutParams } from "next-auth/react";

function logIn(){
  const signInOptions: SignInOptions = {
    callbackUrl: "/",
    prompt: "select_account",
  };

  signIn("google", signInOptions);
}

function logOut(){
  const signOutParams: SignOutParams = {
    callbackUrl: "/"
  };

  signOut(signOutParams);
}

function GoogleSignIn(){
  const { status, data } = useSession(); 
  if (status === "loading"){
    return null;
  };
  let siginInStatus = <></>
  if (status !== "authenticated"){
    siginInStatus = (
      <>
        <button 
          onClick={logIn} 
          type="button" 
          className="cursor-auto hover:cursor-pointer"
          aria-label="Sign In With Google"
        >
          <b>[ Sign in w/ Google ]</b>
        </button>
      </>
    );

  }
  else{
    siginInStatus = (
      <div className="flex mx-auto justify-between items-center">
        <button 
          className="cursor-auto hover:cursor-pointer"
          onClick={logOut}
        >
          <b>[ Sign Out ]</b>
        </button>
      </div>
    );
  }
  
  return siginInStatus;
}

export { GoogleSignIn };