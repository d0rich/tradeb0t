import { DomainMapper, ExchangeConnector, InfoModule, TradeModule } from "./bot"
import { runTradeBot } from "src"

runTradeBot({
  mode: 'production',
  exchangeClient: new ExchangeConnector({
    modules: {
      domainMapper: new DomainMapper(),
      infoModule: new InfoModule(),
      tradeModule: new TradeModule()
    },
    // TODO: make api optional
    api: null
  })
})
