import { z } from "zod"

export const USER_CREATE_VALIDATION_SCHEMA = z.object({
  nickName: z.string().min(2).max(15),
})

export type IUserCreateInput = z.infer<typeof USER_CREATE_VALIDATION_SCHEMA>

export const USER_FETCH_ONE_VALIDATION_SCHEMA = z.object({
  nickName: z.string().min(2).max(15),
})

export type IUserFetchOneInput = z.infer<
  typeof USER_FETCH_ONE_VALIDATION_SCHEMA
>
