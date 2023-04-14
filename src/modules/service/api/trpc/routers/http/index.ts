import { createExpressMiddleware } from '@trpc/server/adapters/express'
import { Express } from 'express'
import { ITradeBot } from '../../../../../../ITradeBot'
import { createContext, router } from './trpc'
import initAlgorithmRouter from './algorithm'
import initSecurityRouter from './security'
import initCurrencyRouter from './currency'
import initPortfolioRouter from './portfolio'
import initOrderRouter from './order'

const initHTTPRouter = (tradeBot: ITradeBot) => {
  return router({
    algorithms: initAlgorithmRouter(tradeBot),
    securities: initSecurityRouter(tradeBot),
    currencies: initCurrencyRouter(tradeBot),
    portfolio: initPortfolioRouter(tradeBot),
    orders: initOrderRouter(tradeBot)
  })
}

export const registerExpressRoutes = ({ tradeBot, express }: { tradeBot: ITradeBot; express: Express }) => {
  express.use(
    '/api/trpc',
    createExpressMiddleware({
      router: initHTTPRouter(tradeBot),
      createContext
    })
  )
}

export type HTTPRouter = ReturnType<typeof initHTTPRouter>
