import { z } from 'zod'
import { procedure, router } from '../trpc'

import { botsRouter } from './bots/control'

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
  control: botsRouter
})
// export type definition of API
export type AppRouter = typeof appRouter
