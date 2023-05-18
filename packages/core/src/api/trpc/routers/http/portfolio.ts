import { publicProcedure, router } from './trpc'
import { ITradeBot } from 'src/bot'

export default (tradebot: ITradeBot) => {
  return router({
    get: publicProcedure.query(async () => {
      return await tradebot.analyzer.storage.portfolio.findPositions()
    }),
    update: publicProcedure.mutation(async () => {
      return await tradebot.analyzer.updatePortfolio()
    }),
    clear: publicProcedure.mutation(async () => {
      return await tradebot.analyzer.storage.portfolio.clear()
    })
  })
}
