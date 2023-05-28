import { z } from 'zod'
import { procedure, router } from '../trpc'

import { botsRepositoryRouter } from './repository'
import { botRouter } from './bot'

export const appRouter = router({
  hello: procedure
    .input(
      z.object({
        text: z.string()
      })
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`
      }
    }),
  repository: botsRepositoryRouter,
  control: botRouter
})
// export type definition of API
export type AppRouter = typeof appRouter
