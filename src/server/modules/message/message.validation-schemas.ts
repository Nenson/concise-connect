import { z } from "zod"

export const MESSAGE_CREATE_VALIDATION_SCHEMA = z.object({
  fromUserId: z.number(),
  toUserId: z.number(),
  text: z.string(),
})

export type IMessageCreateInput = z.infer<
  typeof MESSAGE_CREATE_VALIDATION_SCHEMA
>

export const MESSAGE_FETCH_MANY_VALIDATION_SCHEMA = z.object({
  toUserId: z.number(),
  fromUserId: z.number().optional(),
})

export type IMessageFetchManyInput = z.infer<
  typeof MESSAGE_FETCH_MANY_VALIDATION_SCHEMA
>
