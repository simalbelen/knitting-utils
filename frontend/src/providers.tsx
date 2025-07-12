import { HeroUIProvider } from "@heroui/react";
import { Toaster } from "react-hot-toast";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <HeroUIProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster position="top-right" />
        {children}
      </QueryClientProvider>
    </HeroUIProvider>
  );
}
