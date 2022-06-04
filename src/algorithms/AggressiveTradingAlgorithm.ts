import {D_AlgorithmRun, D_Security} from "@prisma/client";
import { ExchangeAnalyzer } from "../../lib/modules";
import { AbstractTradeAlgorithm } from "../../lib/modules/TradeBot/ExchangeAnalyzer/TradeAlgorithms";
import { addSecondsToDate, OrderDetails } from '../../lib/utils'
import {Job, scheduledJobs, scheduleJob} from "node-schedule";

type AggressiveTraderInput = {
  security_ticker: string
}
type AggressiveTraderState = {
  last_price: number,
  bought: number,
  sold: number
}
type AggressiveTraderStopData = {
  job: Job
}

export class AggressiveTradingAlgorithm
    extends AbstractTradeAlgorithm<AggressiveTraderInput, AggressiveTraderState, AggressiveTraderStopData> {
  get name(): string { return 'aggressive-trading' }
  get description(): string { return 'aggressive-trading' }
  get inputs(): any {
    return {
      security_ticker: 'string'
    }
  }

  constructor(analyzer: ExchangeAnalyzer){
    super(analyzer)
  }

  private async followSecurity(securityTicker: string): Promise<D_Security> {
    const { analyzer, watcher } = this
    let security: D_Security = await watcher.getSecurity(securityTicker)
    security = (await analyzer.addSecurities(security))[0]
    await analyzer.followSecurity(security.ticker)
    return security
  }

  private async watchSecurity(securityTicker: string, runId: number, state: AggressiveTraderState): Promise<Job> {
    const { analyzer, watcher, trader } = this
    let security = await this.followSecurity(securityTicker)
    let lastPrice: number = security.price
    let oldPrice: number = lastPrice
    return scheduleJob('*/1 * * * *', async () => {
      const updatedSecurities = await analyzer.updateFollowedSecurities()
      const updatedSecurity = updatedSecurities.find(s => s.ticker === securityTicker)
      if (!updatedSecurity) {
        oldPrice = lastPrice
        lastPrice = (await this.followSecurity(securityTicker)).price
      } else {
        oldPrice = lastPrice
        lastPrice = updatedSecurity.price
      }
      state.last_price = lastPrice
      await this.saveProgress(runId, state)
      const priceDiffPercents = Math.abs((oldPrice - lastPrice) / oldPrice )
      if (Math.abs(priceDiffPercents) > 0.05){
        if (lastPrice > oldPrice) {
          const {currencies} = await analyzer.tradebot.exchangeClient.api.portfolioCurrencies()
          const currency = currencies.find(c => c.currency === security.currency_ticker)
          if (!currency) return
          if (Math.ceil(lastPrice) * 3 < currency.balance) {
            await trader.sendOrder({
              ticker: securityTicker,
              price: lastPrice,
              lots: Math.floor(currency.balance / 3 / lastPrice),
              operation: "market_buy"
            }, runId)
            state.bought += Math.floor(currency.balance / 3 / lastPrice)
          }
        }
        else {
          const portfolioPosition = (await analyzer.getPortfolio()).find(p => p.security_ticker === securityTicker)
          if (!portfolioPosition) return
          await trader.sendOrder({
            ticker: securityTicker,
            price: lastPrice,
            lots: Math.ceil(portfolioPosition.amount * 2 / 3),
            operation: "market_sell"
          }, runId)
          state.sold += Math.ceil(portfolioPosition.amount * 2 / 3)
        }
        await this.saveProgress(runId, state)
      }
    })
  }

  async main({security_ticker}: AggressiveTraderInput): Promise<D_AlgorithmRun> {
    const { watcher } = this
    const security = await watcher.getSecurity(security_ticker)
    const state: AggressiveTraderState = {
      last_price: security.price,
      sold: 0,
      bought: 0
    }
    const algorithmRun: D_AlgorithmRun = await this.fixStart({security_ticker}, state)
    const job = await this.watchSecurity(security_ticker, algorithmRun.id, state)
    this.stopData.set(algorithmRun.id, { job })

    return algorithmRun
  }

  async continue(id: number): Promise<D_AlgorithmRun> {
    const algorithmRun: D_AlgorithmRun = await this.loadProgress(id)
    const { security_ticker }: AggressiveTraderInput = JSON.parse(algorithmRun.inputs)
    const state: AggressiveTraderState = JSON.parse(algorithmRun.state)
    const job = await this.watchSecurity(security_ticker, algorithmRun.id, state)
    this.stopData.set(algorithmRun.id, { job })

    return await this.fixContinue(id)
  }

  async stop(id: number): Promise<D_AlgorithmRun> {
    const stopData = this.stopData.get(id)
    if (!stopData) throw new Error(`Algorithm run with id:${id} was not found.`)
    stopData.job.cancel()
    return await this.fixStop(id)
  }

}
