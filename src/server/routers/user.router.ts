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
  IUserFetchManyOutput,
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

      const users = await fetchUsers({})

      eventEmitter.emit("userCreated", users)

      return createdUser
    }),
  onCreate: publicProcedure.subscription(() => {
    return observable<IUserFetchManyOutput>((emit) => {
      const onCreate = (data: IUserFetchManyOutput) => {
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
