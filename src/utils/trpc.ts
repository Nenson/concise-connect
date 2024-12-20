import { AppRouter } from "@/server/routers/_app"
import type { TRPCLink } from "@trpc/client"
import { createWSClient, httpBatchLink, loggerLink, wsLink } from "@trpc/client"
import { createTRPCNext } from "@trpc/next"
import { ssrPrepass } from "@trpc/next/ssrPrepass"
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server"
import type { NextPageContext } from "next"
import getConfig from "next/config"
import superjson from "superjson"

const { publicRuntimeConfig } = getConfig()

const { APP_URL, WSS_URL } = publicRuntimeConfig

function getEndingLink(ctx: NextPageContext | undefined): TRPCLink<AppRouter> {
  if (typeof window === "undefined") {
    return httpBatchLink({
      transformer: superjson,
      url: `${APP_URL}/api/trpc`,
      headers() {
        if (!ctx?.req?.headers) {
          return {}
        }

        return {
          ...ctx.req.headers,
          "x-ssr": "1",
        }
      },
    })
  }
  const client = createWSClient({
    url: WSS_URL,
  })
  return wsLink({
    client,
    transformer: superjson,
  })
}

export const trpc = createTRPCNext<AppRouter>({
  ssr: true,
  ssrPrepass,
  config({ ctx }) {
    return {
      links: [
        loggerLink({
          enabled: (opts) =>
            (process.env.NODE_ENV === "development" &&
              typeof window !== "undefined") ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
        getEndingLink(ctx),
      ],
      queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    }
  },
  transformer: superjson,
})

export type RouterInputs = inferRouterInputs<AppRouter>

export type RouterOutputs = inferRouterOutputs<AppRouter>
