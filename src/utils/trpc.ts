import { AppRouter } from "@/server/routers/_app"
import { httpBatchLink } from "@trpc/client"
import { createTRPCNext } from "@trpc/next"
import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server"
import superjson from "superjson"

function getBaseUrl() {
  if (typeof window !== "undefined") {
    return ""
  }

  if (process.env.NEXT_PUBLIC_URL) {
    return `https://${process.env.NEXT_PUBLIC_URL}`
  }

  return `http://localhost:${process.env.PORT ?? 3000}`
}

export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      transformer: superjson,

      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
    }
  },
  ssr: false,
})

export type RouterInputs = inferRouterInputs<AppRouter>

export type RouterOutputs = inferRouterOutputs<AppRouter>
