import { publicProcedure, router } from './trpc'
import { ITradeBot } from 'src/bot'
import { ZGetOrdersOptions } from '../../schemas'

export default (tradebot: ITradeBot) => {
  return router({
    list: publicProcedure.input(ZGetOrdersOptions).query(async ({ input }) => {
      console.log('list orders', input)
      return await tradebot.analyzer.storage.orders.search(input)
    })
  })
}
