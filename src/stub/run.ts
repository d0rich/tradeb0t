import { DomainMapper, ExchangeConnector, InfoModule, TradeModule } from './bot'
import { runTradeBot } from 'src'
import { StubExchangeApi } from './exchange'

async function main() {
  const stubApi = new StubExchangeApi()
  await stubApi.initialize()
  runTradeBot({
    exchangeConnector: new ExchangeConnector({
      modules: {
        domainMapper: new DomainMapper(),
        infoModule: new InfoModule(),
        tradeModule: new TradeModule()
      },
      api: stubApi
    })
  })
}

main()
