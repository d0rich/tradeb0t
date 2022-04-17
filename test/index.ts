try {
  require('dotenv').config()
}catch (e){}

import {TradeBot} from "../bot/TradeBot";
import { OperationTypes } from "../types";

(async () => {
  const awaitTime = (ms: number) => {
    return new Promise((resolve) => {
      setTimeout(() => {resolve(true)}, ms)
    })
  } 
  const tradeBot = new TradeBot(process.env.TINKOFF_SANDBOX_API_KEY || '')


  console.info(`${new Date()} Waiting initialization...`)
  
  while (!tradeBot.exchangeClient.isAccountInitialized){
    await awaitTime(10)
  }

  console.info(`${new Date()} Starting tests...`)

  await tradeBot.trader.sendOrder({ ticker: 'AAPL', lots: 5, operation: OperationTypes.buy, price: 200 })
  await tradeBot.trader.sendOrder({ ticker: 'AAPL', lots: 5, operation: OperationTypes.buy, price: 300 })
  await tradeBot.trader.sendOrder({ ticker: 'AAPL', lots: 2, operation: OperationTypes.sell, price: 100 })
  console.table(await tradeBot.analyzer.updatePortfolio())
  console.table(await tradeBot.analyzer.getPortfolio())
})()

