import { USER_CREATE_VALIDATION_SCHEMA } from "../modules/user/user.validation-schemas"
import { createTRPCRouter, publicProcedure } from "../trpc"
import { createUser, fetchUsers } from "@/server/modules/user/user.services"

export const userRouter = createTRPCRouter({
  create: publicProcedure
    .input(USER_CREATE_VALIDATION_SCHEMA)
    .query(async ({ input }) => createUser({ nickName: input.nickName })),
  fetchMany: publicProcedure.query(async () => fetchUsers()),
})
