import { z } from 'zod'
import { ZGetOrdersOptions } from '@tradeb0t/core'
import { BotsRepository } from '@/src/server/repositories'
import { procedure, router } from '@/src/server/trpc'
import { ZUrl } from '../schemas'

export const botOrdersRouter = router({
  search: procedure
    .input(
      z.object({
        url: ZUrl,
        options: ZGetOrdersOptions
      })
    )
    .query((opts) => {
      const bot = BotsRepository.findBotByUrlOrThrow(opts.input.url)
      return bot.httpClient.orders.list.query(opts.input.options)
    })
})
