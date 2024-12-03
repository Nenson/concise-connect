import { db } from "@/server/db"
import { Message, User } from "@prisma/client"
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

interface IMessageFetchManyData extends Message {
  fromUser: User
  toUser: User
}

export interface IMessageFetchManyOutput {
  readonly data: IMessageFetchManyData[]
  readonly error: null
}

export async function fetchMessages(
  input: IMessageFetchManyInput
): Promise<IMessageFetchManyOutput> {
  const messages = await db.message.findMany({
    where: {
      OR: [
        { toUserId: input.toUserId, fromUserId: input.fromUserId },
        { toUserId: input.fromUserId, fromUserId: input.toUserId },
      ],
    },
    include: {
      fromUser: true,
      toUser: true,
    },
  })

  return {
    data: messages,
    error: null,
  }
}
