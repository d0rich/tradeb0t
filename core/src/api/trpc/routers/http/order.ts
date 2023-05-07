import { publicProcedure, router } from './trpc'
import { ITradeBot } from 'src/bot'
import { getOrdersOptions } from '../../schemas'

export default (tradebot: ITradeBot) => {
  return router({
    list: publicProcedure.input(getOrdersOptions).query(async ({ input }) => {
      return await tradebot.analyzer.storage.orders.search(input)
    })
  })
}
