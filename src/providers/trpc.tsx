"use client";

import { useState } from "react";
import { siteConfig } from "@/config";
import { api } from "@/server/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchStreamLink, loggerLink } from "@trpc/client";
import type { ThemeProviderProps } from "next-themes/dist/types";
import SuperJSON from "superjson";

const createQueryClient = () => new QueryClient();

let clientQueryClientSingleton: QueryClient | undefined;

const getQueryClient = () => {
  if (typeof window === "undefined") {
    // Server: always make a new query client
    return createQueryClient();
  }
  // Browser: use singleton pattern to keep the same query client
  // eslint-disable-next-line no-return-assign
  return (clientQueryClientSingleton ??= createQueryClient());
};

export function TrpcProvider({ children }: ThemeProviderProps) {
  const queryClient = getQueryClient();

  const [trpcClient] = useState(() =>
    api.createClient({
      links: [
        loggerLink({
          enabled: (op) =>
            process.env.NODE_ENV === "development" ||
            (op.direction === "down" && op.result instanceof Error),
        }),
        httpBatchStreamLink({
          transformer: SuperJSON,
          url: `${siteConfig.url}/api/trpc`,
          headers() {
            const headers = new Headers();
            headers.set("x-trpc-source", "nextjs-react");
            return headers;
          },
        }),
      ],
    })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        {children}
      </api.Provider>
    </QueryClientProvider>
  );
}
