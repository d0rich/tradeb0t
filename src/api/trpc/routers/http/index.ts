import { createHTTPHandler } from '@trpc/server/adapters/standalone'
import { ITradeBot } from 'src/bot'
import { App, fromNodeMiddleware } from 'h3'
import { createContext, router } from './trpc'
import initAlgorithmRouter from './algorithm'
import initSecurityRouter from './security'
import initCurrencyRouter from './currency'
import initPortfolioRouter from './portfolio'
import initOrderRouter from './order'

const initHTTPRouter = (tradebot: ITradeBot) => {
  return router({
    algorithms: initAlgorithmRouter(tradebot),
    securities: initSecurityRouter(tradebot),
    currencies: initCurrencyRouter(tradebot),
    portfolio: initPortfolioRouter(tradebot),
    orders: initOrderRouter(tradebot)
  })
}

export const registerH3Routes = async ({ tradebot, h3App }: { tradebot: ITradeBot; h3App: App }) => {
  const router = initHTTPRouter(tradebot)

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
