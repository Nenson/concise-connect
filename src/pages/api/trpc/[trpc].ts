import { type AppRouter, appRouter } from "@/server/routers/_app"
import * as trpcNext from "@trpc/server/adapters/next"

export default trpcNext.createNextApiHandler<AppRouter>({
  router: appRouter,
  onError: ({ path, error }) => {
    if (process.env.NODE_ENV === "development") {
      return console.error(`❌ tRPC failed on ${path}`, error)
    }
  },
})
