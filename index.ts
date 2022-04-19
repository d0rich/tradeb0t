try {
  require('dotenv').config()
}catch (e){}



import {TradeBot} from "./bot/TradeBot";
export const tradeBot = TradeBot.createBotByEnv()

import {restApi, wsApi} from "./api"


restApi.listen(4268, () => {
  console.info('We are online on http://localhost:4268/')
})


