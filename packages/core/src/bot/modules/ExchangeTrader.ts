import { createHooks } from 'hookable'
import { Job, JobCallback, scheduleJob } from 'node-schedule'
import { LoggerService } from '../services'
import { IExchangeTrader, IExchangeTraderHooks } from './IExchangeTrader'
import { IExchangeWatcher } from './IExchangeWatcher'
import { IExchangeConnector } from 'src/connector'
import { ITradeBot } from 'src/bot/ITradeBot'
import { GetOrderType, DomainTemplate, OrderStatus, IDomainMapper } from 'src/domain'
import { CreateOrderOptions } from 'src/api/trpc/schemas'

export class ExchangeTrader<Domain extends DomainTemplate, TExchangeApi> implements IExchangeTrader {
  readonly hooks = createHooks<IExchangeTraderHooks>()
  private readonly tradebot: ITradeBot<Domain, TExchangeApi>

  private get watcher(): IExchangeWatcher {
    return this.tradebot.watcher
  }

  private get logger(): LoggerService {
    return this.tradebot.logger
  }

  private get exchangeConnector(): IExchangeConnector<Domain, TExchangeApi> {
    return this.tradebot.exchangeConnector
  }

  private get domainMapper(): IDomainMapper<Domain> {
    return this.exchangeConnector.domainMapper
  }

  constructor(tradebot: ITradeBot<Domain, TExchangeApi>) {
    this.tradebot = tradebot
  }

  scheduleAction(action: JobCallback, date: Date): Job {
    return scheduleJob(date, action)
  }

  scheduleOrder(date: Date, order: CreateOrderOptions, algorithm_name: string, run_id: number): Job {
    return scheduleJob(date, async () => {
      await this.sendOrder(order, algorithm_name, run_id)
    })
  }

  async sendOrder(orderDetails: CreateOrderOptions, algorithm_name: string, run_id: number): Promise<OrderStatus> {
    this.logger.info(
      'Sending order: ',
      orderDetails,
      algorithm_name
        ? {
            name: algorithm_name,
            run_id: run_id
          }
        : undefined
    )
    let order: GetOrderType<Domain>
    const { operation } = orderDetails
    if (operation === 'buy_or_cancel') {
      order = await this.exchangeConnector.tradeModule.buyOrCancel()
    } else if (operation === 'sell_or_cancel') {
      order = await this.exchangeConnector.tradeModule.sellOrCancel()
    } else if (operation === 'market_buy') {
      order = await this.exchangeConnector.tradeModule.marketBuy(orderDetails)
    } else if (operation === 'market_sell') {
      order = await this.exchangeConnector.tradeModule.marketSell(orderDetails)
    } else if (operation === 'limit_buy') {
      order = await this.exchangeConnector.tradeModule.buy(orderDetails)
    } else if (operation === 'limit_sell') {
      order = await this.exchangeConnector.tradeModule.sell(orderDetails)
    } else {
      throw new Error(`Wrong operation defined in order: ${JSON.stringify(orderDetails)}`)
    }

    const commonOrder = await this.domainMapper.order(order)

    this.hooks.callHook('orderSent', commonOrder, operation, run_id)

    return commonOrder.status
  }
}
