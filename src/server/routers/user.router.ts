import {
  USER_CREATE_VALIDATION_SCHEMA,
  USER_FETCH_MANY_VALIDATION_SCHEMA,
  USER_FETCH_ONE_VALIDATION_SCHEMA,
} from "../modules/user/user.validation-schemas"
import { createTRPCRouter, publicProcedure } from "../trpc"
import {
  createUser,
  fetchUser,
  fetchUsers,
  IUserCreateOutput,
} from "@/server/modules/user/user.services"
import { observable } from "@trpc/server/observable"
import { eventEmitter } from "./event-emitter"

export const userRouter = createTRPCRouter({
  fetchOne: publicProcedure
    .input(USER_FETCH_ONE_VALIDATION_SCHEMA)
    .query(async ({ input }) => fetchUser(input)),
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
  fetchMany: publicProcedure
    .input(USER_FETCH_MANY_VALIDATION_SCHEMA)
    .query(async ({ input }) => fetchUsers(input)),
})
