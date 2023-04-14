import { DomainTemplate, StubDomain } from './domain'
import { TradeBot, TradeBotInitOptions } from './bot'

export function runTradeBot<Domain extends DomainTemplate = StubDomain, TExchangeApi = unknown>(
  options: TradeBotInitOptions<Domain, TExchangeApi>
) {
  return new TradeBot<Domain, TExchangeApi>(options)
}
