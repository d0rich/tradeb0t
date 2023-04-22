import { publicProcedure, router } from './trpc'
import { z } from 'zod'
import { ITradeBot } from 'src/bot'

export default (tradebot: ITradeBot) => {
  return router({
    list: publicProcedure.query(() => {
      return tradebot.analyzer.tradeAlgos.description
    }),
    listRuns: publicProcedure
      .input(
        z.object({
          algorithmName: z.string()
        })
      )
      .query(async ({ input }) => {
        return await tradebot.analyzer.storage.algorithmRuns.findManyByAlgorithm(input.algorithmName)
      }),
    run: publicProcedure
      .input(
        z.object({
          algorithmName: z.string(),
          inputs: z.any()
        })
      )
      .mutation(async ({ input }) => {
        return await tradebot.analyzer.tradeAlgos.runAlgorithm(input.algorithmName, input.inputs)
      }),
    stop: publicProcedure
      .input(
        z.object({
          algorithmName: z.string(),
          runId: z.number().int().min(0)
        })
      )
      .mutation(async ({ input }) => {
        return await tradebot.analyzer.tradeAlgos.stopAlgorithm(input.algorithmName, input.runId)
      }),
    resume: publicProcedure
      .input(
        z.object({
          algorithmName: z.string(),
          runId: z.number().int().min(0)
        })
      )
      .mutation(async ({ input }) => {
        return await tradebot.analyzer.tradeAlgos.continueAlgorithm(input.algorithmName, input.runId)
      })
  })
}
