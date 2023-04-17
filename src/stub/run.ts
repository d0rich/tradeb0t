import { DomainMapper, ExchangeConnector, InfoModule, TradeModule } from './bot'
import { runTradeBot } from 'src'
import { StubExchangeApi } from './exchange'

async function main() {
  const stubApi = new StubExchangeApi()
  await stubApi.initialize()
  console.log('Stub API Initialized')
  runTradeBot({
    mode: 'production',
    exchangeClient: new ExchangeConnector({
      modules: {
        domainMapper: new DomainMapper(),
        infoModule: new InfoModule(),
        tradeModule: new TradeModule()
      },
      // TODO: make api optional
      api: stubApi
    })
  })
}

main()
