"use client";

import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/providers/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import AuthProvider from "./auth-provider";

export default function Providers({ children }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000, // 5 min
            gcTime: 10 * 60 * 1000, // 10 min
            retry: false,
            refetchOnWindowFocus: false,
          },
        },
      })
  );
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
