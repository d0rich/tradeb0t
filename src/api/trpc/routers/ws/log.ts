import { observable } from '@trpc/server/observable'
import { z } from 'zod'
import { ITradeBot } from 'src/bot'
import { publicProcedure, router } from './trpc'
import { TRPCError } from '@trpc/server'
import { LogObject } from 'consola'

export const initLogRouter = (tradebot: ITradeBot) => {
  return router({
    onEvent: publicProcedure
      .input(
        z.object({
          auth: z
            .object({
              token: z.string().optional()
            })
            .optional()
        })
      )
      .subscription(({ input, ctx }) => {
        return observable<LogObject>((emit) => {
          if (!tradebot.auth.authByToken(input.auth?.token)) {
            emit.error(
              new TRPCError({
                code: 'UNAUTHORIZED'
              })
            )
            tradebot.logger.warn('Unauthorized attempt of reading logs', {
              remote: ctx.req.socket.remoteAddress
            })
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            return () => {}
          }
          tradebot.logger.debug('Logs subscription started', {
            remote: ctx.req.socket.remoteAddress
          })
          const onLog = (log: LogObject) => {
            emit.next(log)
          }
          tradebot.logger.subscribe(onLog)

          return () => {
            tradebot.logger.debug('Logs subscription finished', {
              remote: ctx.req.socket.remoteAddress
            })
            tradebot.logger.unsubscribe(onLog)
          }
        })
      })
  })
}
