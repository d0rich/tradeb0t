import { publicProcedure, router } from './trpc'
import { ITradeBot } from 'src/bot'

export default (tradeBot: ITradeBot) => {
  return router({
    get: publicProcedure.query(async () => {
      return await tradeBot.analyzer.storage.portfolio.findPositions()
    }),
    update: publicProcedure.mutation(async () => {
      return await tradeBot.analyzer.updatePortfolio()
    }),
    clear: publicProcedure.mutation(async () => {
      return await tradeBot.analyzer.storage.portfolio.clear()
    })
  })
}
