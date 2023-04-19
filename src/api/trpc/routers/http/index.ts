import { createExpressMiddleware } from '@trpc/server/adapters/express'
import { createHTTPHandler } from '@trpc/server/adapters/standalone'
import { Express } from 'express'
import { ITradeBot } from 'src/bot'
import { App, fromNodeMiddleware } from 'h3'
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

export const registerH3Routes = async ({ tradeBot, h3App }: { tradeBot: ITradeBot; h3App: App }) => {
  const router = initHTTPRouter(tradeBot)

  h3App.use(
    '/api/trpc',
    fromNodeMiddleware(
      createHTTPHandler({
        router: router,
        createContext
      })
    )
  )
  if (process.env.NODE_ENV === 'development') {
    const { h3Handler } = await import('trpc-playground/handlers/h3')
    // FIXME: types for playground are broken
    h3App.use(
      '/trpc-playground',
      await h3Handler({
        trpcApiEndpoint: '/api/trpc',
        playgroundEndpoint: '/trpc-playground',
        router: router
      })
    )
  }
}

export type HTTPRouter = ReturnType<typeof initHTTPRouter>
