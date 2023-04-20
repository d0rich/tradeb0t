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

import { IExchangeWatcher } from './IExchangeWatcher'
import { IExchangeAnalyzer } from './IExchangeAnalyzer'
import { ITradeBot } from 'src/bot/ITradeBot'

export class ExchangeWatcher<Domain extends DomainTemplate, TExchangeApi> implements IExchangeWatcher<Domain> {
  private readonly tradebot: ITradeBot<Domain, TExchangeApi>
  private get domainMapper(): IDomainMapper<Domain> {
    return this.exchangeClient.domainMapper
  }
  private get analyzer(): IExchangeAnalyzer<Domain, TExchangeApi> {
    return this.tradebot.analyzer
  }
  private get trader(): IExchangeTrader<Domain> {
    return this.tradebot.trader
  }
  private get exchangeClient(): IExchangeConnector<Domain, TExchangeApi> {
    return this.tradebot.exchangeClient
  }

  constructor(tradebot: ITradeBot<Domain, TExchangeApi>) {
    this.tradebot = tradebot
    this.trader.hooks.hook('orderSent', async (order, operation_type, runId) => {
      const { domainMapper, analyzer } = this
      const status = domainMapper.orderStatus(order)
      const commonOrder = await domainMapper.order(order)
      await analyzer.storage.orders.saveOne({ ...commonOrder, status: status }, operation_type, runId)
    })
  }

  async getPortfolio(): Promise<GetSecurityBalanceType<CommonDomain>[]> {
    const { exchangeClient, domainMapper } = this
    const portfolio = await exchangeClient.getPortfolio()
    const promises = portfolio.map((position) => domainMapper.securityBalance(position))
    return Promise.all(promises)
  }

  async getCurrenciesBalance(): Promise<GetCurrencyBalanceType<CommonDomain>[]> {
    const { exchangeClient, domainMapper } = this
    const currencies = await exchangeClient.getCurrenciesBalance()
    return await Promise.all(currencies.map((c) => domainMapper.currencyBalance(c)))
  }

  async getCurrencies(): Promise<GetCurrencyType<CommonDomain>[]> {
    const { exchangeClient, domainMapper } = this
    const currencies = await exchangeClient.infoModule.getCurrencies()
    return await Promise.all(currencies.map((c) => domainMapper.currency(c)))
  }

  async getSecurity(ticker: string): Promise<GetSecurityType<CommonDomain>> {
    const { exchangeClient, domainMapper } = this
    const security = await exchangeClient.infoModule.getSecurity(ticker, false)
    if (!security) throw new Error(`Security with ticker "${ticker}" was not found`)
    return domainMapper.security(security)
  }

  async getSecurityName(ticker: string): Promise<string> {
    const { exchangeClient } = this
    return await exchangeClient.infoModule.getSecurityName(ticker)
  }

  async getSecurityLastPrice(ticker: string): Promise<number> {
    const { exchangeClient } = this
    return await exchangeClient.infoModule.getSecurityLastPrice(ticker)
  }

  async getSecurityCurrency(ticker: string): Promise<GetCurrencyType<CommonDomain>> {
    const { exchangeClient, domainMapper } = this
    const currency = await exchangeClient.infoModule.getSecurityCurrency(ticker)
    return domainMapper.currency(currency)
  }
}
