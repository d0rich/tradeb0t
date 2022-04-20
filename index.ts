try {
  require('dotenv').config()
}catch (e){}



import {TradeBot} from "./bot/TradeBot";
export const tradeBot = TradeBot.createBotByEnv()

import {restApi, wsApi} from "./api"


restApi.listen(process.env.REST_PORT || 4268, process.env.HOST || 'localhost', () => {
  console.info(`We are online on http://${process.env.HOST || 'localhost'}:${process.env.REST_PORT || 4268}/`)
})


