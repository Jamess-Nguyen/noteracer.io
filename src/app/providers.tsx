"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export function QcProvider({children}: any){
  const [qc] = useState(() => {
    return new QueryClient();
  });

  const qcProvider = <QueryClientProvider client={qc}>{children}</QueryClientProvider>;
  return qcProvider;
}

