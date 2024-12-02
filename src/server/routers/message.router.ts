import {
  MESSAGE_CREATE_VALIDATION_SCHEMA,
  MESSAGE_FETCH_MANY_VALIDATION_SCHEMA,
} from "../modules/message/message.validation-schemas"
import { createTRPCRouter, publicProcedure } from "../trpc"
import {
  createMessage,
  fetchMessages,
  IMessageCreateOutput,
} from "@/server/modules/message/message.services"
import { observable } from "@trpc/server/observable"
import { eventEmitter } from "./event-emitter"

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
  fetchMany: publicProcedure
    .input(MESSAGE_FETCH_MANY_VALIDATION_SCHEMA)
    .query(async ({ input }) => fetchMessages(input)),
})
