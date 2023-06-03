import { router } from '@/src/server/trpc'
import { botAlgorithmsRouter } from './algorithms'
import { botPortfolioRouter } from './portfolio'
import { botOrdersRouter } from './orders'

export const botRouter = router({
  algorithms: botAlgorithmsRouter,
  portfolio: botPortfolioRouter,
  orders: botOrdersRouter
})
