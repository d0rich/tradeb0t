import { config } from "./config";
import {TradeBot} from "./bot/TradeBot";
export const tradeBot = TradeBot.createBotByEnv()

import {restApi, wsApi} from "./api"


restApi.listen(config.controls.restPort, config.controls.host, () => {
  console.info(`We are online on http://${config.controls.host}:${config.controls.restPort}/`)
})


