import { BotsRepository } from '../../repositories'
import { procedure, router } from '../../trpc'
import { findBotInput } from './_shared'

export const botAlgorithmsRouter = router({
  list: procedure.input(findBotInput).query((opts) => {
    const bot = BotsRepository.findBotByUrl(opts.input.url)
    if (!bot) {
      return
    }
    return bot.httpClient.algorithms.list.query()
  })
})
