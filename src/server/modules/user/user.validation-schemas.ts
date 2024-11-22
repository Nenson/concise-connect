import { z } from "zod"

export const USER_CREATE_VALIDATION_SCHEMA = z.object({
  nickName: z.string(),
})
