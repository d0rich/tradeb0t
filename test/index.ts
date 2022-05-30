import {TradeBot} from "../src/TradeBot";
import { OperationType } from "../src/types";

function awaitTime(ms: number) {
  return new Promise((resolve) => {
    setTimeout(() => {resolve(true)}, ms)
  })
}

(async () => {

  const tradeBot = new TradeBot()

  console.info(`${new Date()} Waiting initialization...`)

  while (!tradeBot.exchangeClient.isAccountInitialized){
    await awaitTime(10)
  }

  console.info(`${new Date()} Starting tests...`)

  await tradeBot.trader.sendOrder({ ticker: 'AAPL', lots: 5, operation: 'buy', price: 200 })
  await tradeBot.trader.sendOrder({ ticker: 'AAPL', lots: 5, operation: 'buy', price: 300 })
  await tradeBot.trader.sendOrder({ ticker: 'AAPL', lots: 2, operation: 'sell', price: 100 })
  await tradeBot.analyzer.updateCurrencies()
  await tradeBot.analyzer.updateInstruments()
  await tradeBot.analyzer.updatePortfolio()
  await tradeBot.analyzer.getPortfolio()
  console.log(tradeBot.analyzer.tradeAlgos.description)
})()

