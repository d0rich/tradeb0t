import { IExchangeTrader } from './IExchangeTrader'
import { IExchangeConnector } from 'src/connector'
import { OperationType, OrderStatus } from 'src/domain/models'
import {
  CommonDomain,
  DomainTemplate,
  IDomainMapper,
  GetSecurityBalanceType,
  GetCurrencyType,
  GetSecurityType,
  GetCurrencyBalanceType,
  GetOrderType
} from 'src/domain'
import { HandleError } from '../../decorators'

import { IExchangeWatcher } from './IExchangeWatcher'
import { IExchangeAnalyzer } from './IExchangeAnalyzer'
import { ITradeBot } from 'src/bot/ITradeBot'

export class ExchangeWatcher<Domain extends DomainTemplate, TExchangeApi> implements IExchangeWatcher<Domain> {
  private readonly tradebot: ITradeBot<Domain, TExchangeApi>
  private get domainMapper(): IDomainMapper {
    return this.exchangeClient.domainMapper
  }
  private get analyzer(): IExchangeAnalyzer<Domain, TExchangeApi> {
    return this.tradebot.analyzer
  }
  private get trader(): IExchangeTrader {
    return this.tradebot.trader
  }
  private get exchangeClient(): IExchangeConnector<Domain, TExchangeApi> {
    return this.tradebot.exchangeClient
  }

  constructor(tradebot: ITradeBot<Domain, TExchangeApi>) {
    this.tradebot = tradebot
  }

  @HandleError()
  async getPortfolio(): Promise<GetSecurityBalanceType<CommonDomain>[]> {
    const { exchangeClient, domainMapper } = this
    const portfolio = await exchangeClient.getPortfolio()
    const promises = portfolio.map((position) => domainMapper.securityBalance(position))
    return Promise.all(promises)
  }

  @HandleError()
  async getCurrenciesBalance(): Promise<GetCurrencyBalanceType<CommonDomain>[]> {
    const { exchangeClient, domainMapper } = this
    const currencies = await exchangeClient.getCurrenciesBalance()
    return await Promise.all(currencies.map((c) => domainMapper.currencyBalance(c)))
  }

  @HandleError()
  async getCurrencies(): Promise<GetCurrencyType<CommonDomain>[]> {
    const { exchangeClient, domainMapper } = this
    const currencies = await exchangeClient.infoModule.getCurrencies()
    return await Promise.all(currencies.map((c) => domainMapper.currency(c)))
  }

  @HandleError()
  async getSecurity(ticker: string): Promise<GetSecurityType<CommonDomain>> {
    const { exchangeClient, domainMapper } = this
    const security = await exchangeClient.infoModule.getSecurity(ticker, false)
    if (!security) throw new Error(`Security with ticker "${ticker}" was not found`)
    return domainMapper.security(security)
  }

  @HandleError()
  async getSecurityName(ticker: string): Promise<string> {
    const { exchangeClient } = this
    return await exchangeClient.infoModule.getSecurityName(ticker)
  }

  @HandleError()
  async getSecurityLastPrice(ticker: string): Promise<number> {
    const { exchangeClient } = this
    return await exchangeClient.infoModule.getSecurityLastPrice(ticker)
  }

  @HandleError()
  async getSecurityCurrency(ticker: string): Promise<GetCurrencyType<CommonDomain>> {
    const { exchangeClient, domainMapper } = this
    const currency = await exchangeClient.infoModule.getSecurityCurrency(ticker)
    return domainMapper.currency(currency)
  }

  onOrderSent(
    order: GetOrderType<Domain>,
    operation_type: OperationType,
    runId: number | undefined = undefined
  ): OrderStatus {
    const { domainMapper, analyzer } = this
    const status = domainMapper.orderStatus(order)
    domainMapper.order(order).then((order) => analyzer.saveOrder({ ...order, status: status }, operation_type, runId))
    return status
  }
}