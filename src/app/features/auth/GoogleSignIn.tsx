"use client";
import { signIn, SignInOptions } from "next-auth/react";

function logIn(){
  const signInOptions: SignInOptions = {
    callbackUrl: "/"
  };

  signIn("google", signInOptions);
}

function GoogleSignIn(){
  return (<button onClick={logIn} type="button"><b>Sign in w/ Google</b></button>);
}

export { GoogleSignIn };