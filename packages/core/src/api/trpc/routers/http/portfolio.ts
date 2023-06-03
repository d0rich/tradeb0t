import { publicProcedure, router } from './trpc'
import { ITradeBot } from 'src/bot'

export default (tradebot: ITradeBot) => {
  return router({
    get: publicProcedure.query(async () => {
      return await tradebot.analyzer.storage.portfolio.findPositions({
        relations: {
          asset: true
        }
      })
    }),
    getCurrencies: publicProcedure.query(async () => {
      return await tradebot.analyzer.storage.portfolio.currencies.find({
        relations: {
          asset: true
        }
      })
    }),
    getSecurities: publicProcedure.query(async () => {
      return await tradebot.analyzer.storage.portfolio.securities.find({
        relations: {
          asset: true
        }
      })
    }),
    update: publicProcedure.mutation(async () => {
      return await tradebot.analyzer.updatePortfolio()
    }),
    clear: publicProcedure.mutation(async () => {
      return await tradebot.analyzer.storage.portfolio.clear()
    })
  })
}
