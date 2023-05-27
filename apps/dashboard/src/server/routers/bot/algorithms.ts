import { z } from 'zod'
import { BotsRepository } from '../../repositories'
import { procedure, router } from '../../trpc'
import { ZAlgorithmName, ZInputs } from '@tradeb0t/core'
import { findBotInput } from './_shared'

export const botAlgorithmsRouter = router({
  list: procedure.input(z.object({
    url: z.string()
  })).query((opts) => {
    const bot = BotsRepository.findBotByUrlOrThrow(opts.input.url)
    return bot.httpClient.algorithms.list.query()
  }),
  run: procedure.input(z.object({
    url: z.string(),
    algorithmName: ZAlgorithmName,
    inputs: ZInputs
  })).mutation((opts) => {
    const bot = BotsRepository.findBotByUrlOrThrow(opts.input.url)
    return bot.httpClient.algorithms.run.mutate({
      algorithmName: opts.input.algorithmName,
      inputs: opts.input.inputs
    })
  })
})
