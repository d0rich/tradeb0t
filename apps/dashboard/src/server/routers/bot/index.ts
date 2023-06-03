import { procedure, router } from '../../trpc'
import { botAlgorithmsRouter } from './algorithms'
import { botPortfolioRouter } from './portfolio'

export const botRouter = router({
  algorithms: botAlgorithmsRouter,
  portfolio: botPortfolioRouter
})
