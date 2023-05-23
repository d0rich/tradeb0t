import { BotsRepository } from '../../repositories'
import { procedure, router } from '../../trpc'

export const botsRouter = router({
  getBots: procedure.query(() => {
    return {
      bots: BotsRepository.bots.map((bot) => {
        return {
          name: bot.name,
          url: `${bot.host}:${bot.port}`
        }
      })
    }
  })
})
