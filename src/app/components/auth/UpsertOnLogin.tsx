"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

function UpsertOnLogin() {
  const { status } = useSession();
  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/v1/users", { method: "POST" }).catch(console.error);
      console.log("Upserted User")
    }
  }, [status]);
  return null;
}

export {UpsertOnLogin};