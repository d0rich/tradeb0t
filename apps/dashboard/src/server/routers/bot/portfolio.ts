import { z } from 'zod'
import { BotsRepository } from '@/src/server/repositories'
import { procedure, router } from '@/src/server/trpc'
import { ZUrl } from '../schemas'

export const botPortfolioRouter = router({
  getCurrencies: procedure
    .input(
      z.object({
        url: ZUrl
      })
    )
    .query((opts) => {
      const bot = BotsRepository.findBotByUrlOrThrow(opts.input.url)
      return bot.httpClient.portfolio.getCurrencies.query()
    }),
  getSecurities: procedure
    .input(
      z.object({
        url: ZUrl
      })
    )
    .query((opts) => {
      const bot = BotsRepository.findBotByUrlOrThrow(opts.input.url)
      return bot.httpClient.portfolio.getSecurities.query()
    }),
  update: procedure
    .input(
      z.object({
        url: ZUrl
      })
    )
    .mutation((opts) => {
      const bot = BotsRepository.findBotByUrlOrThrow(opts.input.url)
      return bot.httpClient.portfolio.update.mutate()
    })
})
