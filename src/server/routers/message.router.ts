import EventEmitter from "events"
import { MESSAGE_CREATE_VALIDATION_SCHEMA } from "../modules/message/message.validation-schemas"
import { createTRPCRouter, publicProcedure } from "../trpc"
import {
  createMessage,
  fetchMessages,
  IMessageCreateOutput,
} from "@/server/modules/message/message.services"
import { observable } from "@trpc/server/observable"

interface IMessageEvents {
  readonly messageCreated: (data: IMessageCreateOutput) => void
}

declare interface MessageEventEmitter {
  on<TEv extends keyof IMessageEvents>(
    event: TEv,
    listener: IMessageEvents[TEv]
  ): this
  off<TEv extends keyof IMessageEvents>(
    event: TEv,
    listener: IMessageEvents[TEv]
  ): this
  once<TEv extends keyof IMessageEvents>(
    event: TEv,
    listener: IMessageEvents[TEv]
  ): this
  emit<TEv extends keyof IMessageEvents>(
    event: TEv,
    ...args: Parameters<IMessageEvents[TEv]>
  ): boolean
}

class MessageEventEmitter extends EventEmitter {}

const eventEmitter = new MessageEventEmitter()

export const messageRouter = createTRPCRouter({
  create: publicProcedure
    .input(MESSAGE_CREATE_VALIDATION_SCHEMA)
    .mutation(async ({ input }) => {
      const createdMessage = await createMessage({
        fromUserId: input.fromUserId,
        toUserId: input.toUserId,
        text: input.text,
      })

      eventEmitter.emit("messageCreated", createdMessage)

      return createdMessage
    }),
  onCreate: publicProcedure.subscription(() => {
    return observable<IMessageCreateOutput>((emit) => {
      const onCreate = (data: IMessageCreateOutput) => {
        emit.next(data)
      }

      eventEmitter.on("messageCreated", onCreate)

      return () => {
        eventEmitter.off("messageCreated", onCreate)
      }
    })
  }),
  fetchMany: publicProcedure.query(async () => fetchMessages()),
})
