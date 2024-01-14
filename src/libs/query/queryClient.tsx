import { ReactNode } from 'react';

import {
  QueryClient,
  QueryClientProvider as TanstackQueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const customQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity, // Always stale
      refetchInterval: 1000 * 60 * 45, // 45 minutes
      retry: 1,
      refetchOnWindowFocus: false,
      gcTime: 1000 * 60 * 60 * 2, // 2 hours
    },
  },
});

function CustomQueryClientProvider({ children }: { children: ReactNode }) {
  return (
    <TanstackQueryClientProvider client={customQueryClient}>
      <ReactQueryDevtools />
      {children}
    </TanstackQueryClientProvider>
  );
}

export { customQueryClient, CustomQueryClientProvider };
