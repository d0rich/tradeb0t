import { BotsRepository } from '../../repositories'
import { procedure, router } from '../../trpc'
import { z } from 'zod'

export const botsRepositoryRouter = router({
  findBot: procedure
    .input(
      z.object({
        url: z.string()
      })
    )
    .query((opts) => {
      const bot = BotsRepository.findBotByUrl(opts.input.url)
      if (!bot) {
        return
      }
      return {
        name: bot.name,
        url: `${bot.host}:${bot.port}`
      }
    }),
  getBots: procedure.query(() => {
    return BotsRepository.bots.map((bot) => {
      return {
        name: bot.name,
        url: `${bot.host}:${bot.port}`
      }
    })
  })
})
