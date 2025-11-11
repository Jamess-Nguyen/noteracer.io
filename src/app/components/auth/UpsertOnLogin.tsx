"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

function UpsertOnLogin() {
  const { status } = useSession();
  useEffect(() => {
    if (status === "authenticated") {
      try{
        fetch("/api/v1/users", { method: "POST" });
      }
      catch(error){
        console.log(error);
      }
    }
  }, [status]);
  return null;
}

export {UpsertOnLogin};