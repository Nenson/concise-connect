import EventEmitter from "events"
import { USER_CREATE_VALIDATION_SCHEMA } from "../modules/user/user.validation-schemas"
import { createTRPCRouter, publicProcedure } from "../trpc"
import {
  createUser,
  fetchUsers,
  IUserCreateOutput,
} from "@/server/modules/user/user.services"
import { observable } from "@trpc/server/observable"

interface IUserEvents {
  readonly userCreated: (data: IUserCreateOutput) => void
}

declare interface UserEventEmitter {
  on<TEv extends keyof IUserEvents>(
    event: TEv,
    listener: IUserEvents[TEv]
  ): this
  off<TEv extends keyof IUserEvents>(
    event: TEv,
    listener: IUserEvents[TEv]
  ): this
  once<TEv extends keyof IUserEvents>(
    event: TEv,
    listener: IUserEvents[TEv]
  ): this
  emit<TEv extends keyof IUserEvents>(
    event: TEv,
    ...args: Parameters<IUserEvents[TEv]>
  ): boolean
}

class UserEventEmitter extends EventEmitter {}

const eventEmitter = new UserEventEmitter()

export const userRouter = createTRPCRouter({
  create: publicProcedure
    .input(USER_CREATE_VALIDATION_SCHEMA)
    .mutation(async ({ input }) => {
      const createdUser = await createUser({ nickName: input.nickName })

      eventEmitter.emit("userCreated", createdUser)

      return createdUser
    }),
  onCreate: publicProcedure.subscription(() => {
    return observable<IUserCreateOutput>((emit) => {
      const onCreate = (data: IUserCreateOutput) => {
        emit.next(data)
      }

      eventEmitter.on("userCreated", onCreate)

      return () => {
        eventEmitter.off("userCreated", onCreate)
      }
    })
  }),
  fetchMany: publicProcedure.query(async () => fetchUsers()),
})
