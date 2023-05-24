import { procedure, router } from '../../trpc'
import { botAlgorithmsRouter } from './algorithms'

export const botRouter = router({
  algorithms: botAlgorithmsRouter
})
