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
  getAllBotsCurrencies: procedure.query(async () => {
    const currenciesPromises = BotsRepository.bots.map((bot) => {
      return bot.httpClient.portfolio.getCurrencies.query()
    })
    const currencies = await Promise.all(currenciesPromises)
    return currencies.reduce((acc, curr) => {
      for (let currency of curr) {
        const index = acc.findIndex((accCurrency) => {
          return accCurrency.assetTicker === currency.assetTicker
        })
        if (index !== -1) {
          acc[index].amount += currency.amount
        } else {
          acc.push(currency)
        }
      }
      return acc
    }, [])
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
  getAllBotsSecurities: procedure.query(async () => {
    const securitiesPromises = BotsRepository.bots.map((bot) => {
      return bot.httpClient.portfolio.getSecurities.query()
    })
    const securities = await Promise.all(securitiesPromises)
    return securities.reduce((acc, curr) => {
      for (let securitiy of curr) {
        const index = acc.findIndex((accSecuritiy) => {
          return accSecuritiy.assetTicker === securitiy.assetTicker
        })
        if (index !== -1) {
          acc[index].amount += securitiy.amount
        } else {
          acc.push(securitiy)
        }
      }
      return acc
    }, [])
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
