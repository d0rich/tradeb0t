import { publicProcedure, router } from './trpc'
import { ITradeBot } from 'src/bot'

export default (tradebot: ITradeBot) => {
  return router({
    list: publicProcedure.query(async () => {
      return await tradebot.analyzer.storage.currencies.find()
    }),
    update: publicProcedure.mutation(async () => {
      return await tradebot.analyzer.updateCurrencies()
    }),
    listBalances: publicProcedure.query(async () => {
      return await tradebot.analyzer.storage.portfolio.currencies.find()
    }),
    updateBalances: publicProcedure.mutation(async () => {
      return await tradebot.analyzer.updateCurrenciesBalance()
    })
  })
}
