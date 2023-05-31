import { z } from 'zod'
import { BotsRepository } from '../../repositories'
import { procedure, router } from '../../trpc'
import { ZAlgorithmName, ZInputs, ZRunId, ZPaginationOptions } from '@tradeb0t/core'

const ZUrl = z.string()

export const botAlgorithmsRouter = router({
  list: procedure
    .input(
      z.object({
        url: ZUrl
      })
    )
    .query((opts) => {
      const bot = BotsRepository.findBotByUrlOrThrow(opts.input.url)
      return bot.httpClient.algorithms.list.query()
    }),
  listRuns: procedure
    .input(
      z.object({
        url: ZUrl,
        algorithmName: ZAlgorithmName,
        pagination: ZPaginationOptions
      })
    )
    .query((opts) => {
      const bot = BotsRepository.findBotByUrlOrThrow(opts.input.url)
      return bot.httpClient.algorithms.listRuns.query({
        algorithmName: opts.input.algorithmName,
        pagination: opts.input.pagination
      })
    }),
  run: procedure
    .input(
      z.object({
        url: ZUrl,
        algorithmName: ZAlgorithmName,
        inputs: ZInputs
      })
    )
    .mutation((opts) => {
      const bot = BotsRepository.findBotByUrlOrThrow(opts.input.url)
      return bot.httpClient.algorithms.run.mutate({
        algorithmName: opts.input.algorithmName,
        inputs: opts.input.inputs
      })
    }),
  stop: procedure
    .input(
      z.object({
        url: ZUrl,
        algorithmName: ZAlgorithmName,
        runId: ZRunId
      })
    )
    .mutation((opts) => {
      const bot = BotsRepository.findBotByUrlOrThrow(opts.input.url)
      return bot.httpClient.algorithms.stop.mutate({
        algorithmName: opts.input.algorithmName,
        runId: opts.input.runId
      })
    }),
  resume: procedure
    .input(
      z.object({
        url: ZUrl,
        algorithmName: ZAlgorithmName,
        runId: ZRunId
      })
    )
    .mutation((opts) => {
      const bot = BotsRepository.findBotByUrlOrThrow(opts.input.url)
      return bot.httpClient.algorithms.resume.mutate({
        algorithmName: opts.input.algorithmName,
        runId: opts.input.runId
      })
    })
})
