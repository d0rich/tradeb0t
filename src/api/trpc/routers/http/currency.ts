import { publicProcedure, router } from './trpc'
import { ITradeBot } from 'src/bot'

export default (tradeBot: ITradeBot) => {
  return router({
    list: publicProcedure.query(async () => {
      return await tradeBot.analyzer.storage.currencies.find()
    }),
    update: publicProcedure.mutation(async () => {
      return await tradeBot.analyzer.updateCurrencies()
    }),
    listBalances: publicProcedure.query(async () => {
      return await tradeBot.analyzer.storage.portfolio.currencies.find()
    }),
    updateBalances: publicProcedure.mutation(async () => {
      return await tradeBot.analyzer.updateCurrenciesBalance()
    })
  })
}
