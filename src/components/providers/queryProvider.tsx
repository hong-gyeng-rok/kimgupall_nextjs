"use client";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect } from "react";

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: Infinity,
            gcTime: 1000 * 60 * 60 * 24,
          },
        },
      }),
  );

  const [persister, setPersister] = useState<any>(null);

  useEffect(() => {
    // 클라이언트 마운트 시점에만 persister 생성
    const p = createSyncStoragePersister({
      storage: window.sessionStorage,
    });
    setPersister(p);
  }, []);

  // persister가 준비되기 전에는 렌더링을 하지 않음 (API 중복 호출 방지)
  if (!persister) {
    return null;
  }

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </PersistQueryClientProvider>
  );
}