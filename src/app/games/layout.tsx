"use client";

import { getRequest, serverCall } from "@/lib/reactQueryFunctions";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const GameLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        queryFn: getRequest,
        staleTime: 20000,
      },

      mutations: {
        mutationFn: serverCall,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default GameLayout;
