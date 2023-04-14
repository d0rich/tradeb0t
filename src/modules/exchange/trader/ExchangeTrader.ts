import { Job, JobCallback, scheduleJob } from 'node-schedule'
import { TradeBot } from '../../../TradeBot'
import {  LoggerService } from '../../index'
import { CreateOrderOptions, OrderStatus } from '../../../types'
import { GetOrderType, DomainTemplate } from '../../../domain'
import { HandleError } from '../../../decorators'
import { IExchangeTrader } from './IExchangeTrader'
import { IExchangeWatcher } from '../watcher/IExchangeWatcher'
import { IExchangeClient } from '../../../abstract'

export class ExchangeTrader<Domain extends DomainTemplate, TExchangeApi> implements IExchangeTrader {
  private readonly tradebot: TradeBot<ExchangeClient>
  private get watcher(): IExchangeWatcher<Domain> {
    return this.tradebot.watcher
  }
  private get logger(): LoggerService {
    return this.tradebot.logger
  }
  private get exchangeClient(): IExchangeClient<Domain, TExchangeApi> {
    return this.tradebot.exchangeClient
  }

  constructor(tradebot: TradeBot<ExchangeClient>) {
    this.tradebot = tradebot
  }

  scheduleAction(action: JobCallback, date: Date): Job {
    return scheduleJob(date, action)
  }

  scheduleOrder(
    date: Date,
    order: CreateOrderOptions,
    algorithm_name: string | undefined = undefined,
    run_id: number | undefined = undefined
  ): Job {
    return scheduleJob(date, async () => {
      await this.sendOrder(order, algorithm_name, run_id)
    })
  }

  @HandleError()
  async sendOrder(orderDetails: CreateOrderOptions, algorithm_name?: string, run_id?: number): Promise<OrderStatus> {
    const { watcher } = this
    this.logger.log({
      type: 'info',
      message: 'Sending order',
      attachment: {
        order: orderDetails
      },
      algorithm: algorithm_name
        ? {
            name: algorithm_name,
            run_id: run_id
          }
        : undefined
    })
    let order: GetOrderType<Domain>
    const { operation } = orderDetails
    if (operation === 'buy_or_cancel') {
      order = await this.exchangeClient.tradeModule.buyOrCancel()
    } else if (operation === 'sell_or_cancel') {
      order = await this.exchangeClient.tradeModule.sellOrCancel()
    } else if (operation === 'market_buy') {
      order = await this.exchangeClient.tradeModule.marketBuy(orderDetails)
    } else if (operation === 'market_sell') {
      order = await this.exchangeClient.tradeModule.marketSell(orderDetails)
    } else if (operation === 'limit_buy') {
      order = await this.exchangeClient.tradeModule.buy(orderDetails)
    } else if (operation === 'limit_sell') {
      order = await this.exchangeClient.tradeModule.sell(orderDetails)
    } else {
      throw new Error(`Wrong operation defined in order: ${JSON.stringify(orderDetails)}`)
    }

    return watcher.onOrderSent(order, operation, run_id)
  }
}
