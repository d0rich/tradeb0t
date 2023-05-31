import { procedure, router } from '../../trpc'
import { observable } from '@trpc/server/observable'
import { z } from 'zod'
import type { LogObject } from 'consola'

import { eventEmitter } from './eventEmitter'

export const wsRouter = router({
  onSingleBotLog: procedure
    .input(
      z.object({
        botUrl: z.string()
      })
    )
    .subscription(({ input }) => {
      const currentBotLogEventName = `log:${input.botUrl}`
      return observable<LogObject>((emit) => {
        const onLog = (data: LogObject) => {
          emit.next(data)
        }
        eventEmitter.on(currentBotLogEventName, onLog)
        return () => {
          eventEmitter.off(currentBotLogEventName, onLog)
        }
      })
    }),
  onEveryBotLog: procedure.subscription(() => {
    const logEventName = `log:all`
    return observable<LogObject>((emit) => {
      const onLog = (data: LogObject) => {
        emit.next(data)
      }
      eventEmitter.on(logEventName, onLog)
      return () => {
        eventEmitter.off(logEventName, onLog)
      }
    })
  })
})
