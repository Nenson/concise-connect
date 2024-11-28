import { z } from "zod"

export const MESSAGE_CREATE_VALIDATION_SCHEMA = z.object({
  fromUserId: z.number(),
  toUserId: z.number(),
  text: z.string(),
})

export type IMessageCreateInput = z.infer<
  typeof MESSAGE_CREATE_VALIDATION_SCHEMA
>
