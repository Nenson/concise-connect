import EventEmitter from "events"

interface IEmitterEvents {
  readonly userCreated: () => void
  readonly messageCreated: () => void
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
