import { publicProcedure, router } from './trpc'
import { ITradeBot } from '../../../../../../ITradeBot'
import { getOrdersOptions } from '../../schemas/GetOrdersOptions'

export default (tradeBot: ITradeBot) => {
  return router({
    list: publicProcedure.input(getOrdersOptions).query(async ({ input }) => {
      return await tradeBot.analyzer.getOrders(input)
    })
  })
}
