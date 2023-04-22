import { publicProcedure, router } from './trpc'
import { z } from 'zod'
import { ITradeBot } from 'src/bot'

export default (tradebot: ITradeBot) => {
  return router({
    list: publicProcedure.query(async () => {
      return await tradebot.analyzer.storage.securities.find()
    }),
    update: publicProcedure.mutation(async () => {
      return await tradebot.analyzer.updateSecurities()
    }),
    listFollowed: publicProcedure.query(async () => {
      return await tradebot.analyzer.storage.securities.findAllFollowed()
    }),
    updateFollowed: publicProcedure.mutation(async () => {
      return await tradebot.analyzer.updateFollowedSecurities()
    }),
    follow: publicProcedure
      .input(
        z.object({
          securityTicker: z.string()
        })
      )
      .mutation(async ({ input }) => {
        return await tradebot.analyzer.storage.securities.follow(input.securityTicker)
      }),
    unfollow: publicProcedure
      .input(
        z.object({
          securityTicker: z.string()
        })
      )
      .mutation(async ({ input }) => {
        return await tradebot.analyzer.storage.securities.unfollow(input.securityTicker)
      })
  })
}
