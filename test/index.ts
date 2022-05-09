import {TradeBot} from "../bot/TradeBot";
import { OperationTypes } from "../types";

async function awaitTime(ms: number) {
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

  await tradeBot.trader.sendOrder({ ticker: 'AAPL', lots: 5, operation: OperationTypes.buy, price: 200 })
  await tradeBot.trader.sendOrder({ ticker: 'AAPL', lots: 5, operation: OperationTypes.buy, price: 300 })
  await tradeBot.trader.sendOrder({ ticker: 'AAPL', lots: 2, operation: OperationTypes.sell, price: 100 })
  console.table(await tradeBot.analyzer.updateCurrencies())
  console.table(await tradeBot.analyzer.updateSecurities())
  console.table(await tradeBot.analyzer.updatePortfolio())
  console.table(await tradeBot.analyzer.getPortfolio())
})()

