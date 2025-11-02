"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { SessionProvider } from "next-auth/react";

export function DepedencyProvider({children}: any){
  const [qc] = useState(() => {
    return new QueryClient();
  });

  const DepedencyProvider = (
    <SessionProvider>
      <QueryClientProvider client={qc}>
        {children}
      </QueryClientProvider>
    </SessionProvider>
  );
  return DepedencyProvider;
}
