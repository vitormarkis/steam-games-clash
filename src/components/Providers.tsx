"use client"

import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"
import { useState } from "react"
import { Toaster, toast } from "sonner"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { GameProvider } from "@/core/reducer"

type ProvidersProps = React.PropsWithChildren

export function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            retry: false,
          },
        },
        mutationCache: new MutationCache({
          onError: error => toast.error(error.message),
        }),
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      <GameProvider>{children}</GameProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
