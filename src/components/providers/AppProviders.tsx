"use client";

import { getRequest, serverCall } from "@/lib/reactQueryFunctions";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import * as React from "react";
import AuthProvider from "./AuthProvider";
type Props = {
  children: React.ReactNode;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      queryFn: getRequest,
    },

    mutations: {
      mutationFn: serverCall,
    },
  },
});

const AppProviders = ({ children }: Props) => {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default AppProviders;
