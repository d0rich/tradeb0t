import { Job, JobCallback, scheduleJob } from 'node-schedule'
import { LoggerService } from '../services'
import { OrderStatus } from 'src/db'
import { HandleError } from '../../decorators'
import { IExchangeTrader } from './IExchangeTrader'
import { IExchangeWatcher } from './IExchangeWatcher'
import { IExchangeConnector } from 'src/connector'
import { ITradeBot } from 'src/bot/ITradeBot'
import { CreateOrderOptions, GetOrderType, DomainTemplate } from 'src/domain'

export class ExchangeTrader<Domain extends DomainTemplate, TExchangeApi> implements IExchangeTrader {
  private readonly tradebot: ITradeBot<Domain, TExchangeApi>
  private get watcher(): IExchangeWatcher<Domain> {
    return this.tradebot.watcher
  }
  private get logger(): LoggerService {
    return this.tradebot.logger
  }
  private get exchangeClient(): IExchangeConnector<Domain, TExchangeApi> {
    return this.tradebot.exchangeClient
  }

  constructor(tradebot: ITradeBot<Domain, TExchangeApi>) {
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
