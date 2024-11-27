import { createTRPCRouter } from "../trpc"
import { messageRouter } from "./message.router"
import { userRouter } from "./user.router"

export const appRouter = createTRPCRouter({
  user: userRouter,
  message: messageRouter,
})

export type AppRouter = typeof appRouter
