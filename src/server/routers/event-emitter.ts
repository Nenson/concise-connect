import EventEmitter from "events"
import { IUserCreateOutput } from "../modules/user/user.services"
import { IMessageCreateOutput } from "../modules/message/message.services"

interface IEmitterEvents {
  readonly userCreated: (data: IUserCreateOutput) => void
  readonly messageCreated: (data: IMessageCreateOutput) => void
}

declare interface EventsEmitter {
  on<TEv extends keyof IEmitterEvents>(
    event: TEv,
    listener: IEmitterEvents[TEv]
  ): this
  off<TEv extends keyof IEmitterEvents>(
    event: TEv,
    listener: IEmitterEvents[TEv]
  ): this
  once<TEv extends keyof IEmitterEvents>(
    event: TEv,
    listener: IEmitterEvents[TEv]
  ): this
  emit<TEv extends keyof IEmitterEvents>(
    event: TEv,
    ...args: Parameters<IEmitterEvents[TEv]>
  ): boolean
}

class EventsEmitter extends EventEmitter {}

export const eventEmitter = new EventsEmitter()
