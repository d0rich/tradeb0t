import { publicProcedure, router } from './trpc'
import { ITradeBot } from 'src/bot'
import { getOrdersOptions } from '../../schemas'

export default (tradeBot: ITradeBot) => {
  return router({
    list: publicProcedure.input(getOrdersOptions).query(async ({ input }) => {
      return await tradeBot.analyzer.getOrders(input)
    })
  })
}
