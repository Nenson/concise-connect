import { db } from "@/server/db"
import { Message } from "@prisma/client"
import {
  IMessageCreateInput,
  IMessageFetchManyInput,
} from "./message.validation-schemas"

export interface IMessageCreateOutput {
  readonly data: Message | null
  readonly error: {
    readonly code: string
    readonly message: string
  } | null
}

export async function createMessage(
  input: IMessageCreateInput
): Promise<IMessageCreateOutput> {
  const createdMessage = await db.message.create({
    data: {
      fromUserId: input.fromUserId,
      toUserId: input.toUserId,
      text: input.text,
    },
  })

  return {
    data: createdMessage,
    error: null,
  }
}

export async function fetchMessages(input: IMessageFetchManyInput) {
  const messages = await db.message.findMany({
    where: {
      toUserId: input.toUserId,
      fromUserId: input.fromUserId,
    },
  })

  return {
    data: messages,
    error: null,
  }
}
