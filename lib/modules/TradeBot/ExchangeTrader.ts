import {ExchangeWatcher} from "./index";
import {OrderDetails} from "lib/utils/orderDetails";
import {TradeBot} from "../../TradeBot";
import {Job} from "node-schedule";
import { ExchangeClient } from "lib/ExchangeClient";
import { BotLogger } from "./BotLogger";
const schedule = require('node-schedule');

export class ExchangeTrader {
    private readonly tradebot: TradeBot
    private get watcher(): ExchangeWatcher { return this.tradebot.watcher }
    private get logger(): BotLogger { return this.tradebot.logger }
    private get exchangeClient(): ExchangeClient { return this.tradebot.exchangeClient }

    constructor(tradebot: TradeBot) {
        this.tradebot = tradebot
    }

    scheduleAction(action: Function, date: Date): Job {
        return schedule.scheduleJob(date, action)
    }

    scheduleOrder(order: OrderDetails, date: Date): Job {
        return schedule.scheduleJob(date, async () => {
            await this.sendOrder(order)
        })
    }

    async sendOrder({ ticker, lots, price, operation }: OrderDetails) {
        this.logger.log(`Sending order: ${JSON.stringify({operation, ticker, lots, price})}`)
        try {
            let order
            switch (operation){
                case 'buy':
                    order = await this.exchangeClient.tradeModule.buy({ ticker, lots, price, operation })
                    break
                case 'buy_or_cancel':
                    order = await this.exchangeClient.tradeModule.buyOrCancel()
                    break
                case 'sell':
                    order = await this.exchangeClient.tradeModule.sell({ ticker, lots, price, operation })
                    break
                case 'sell_or_cancel':
                    order = await this.exchangeClient.tradeModule.sellOrCancel()
                    break
                default:
                    throw new Error('Incorrect operation type')
                    break
            }
        } catch (e: any) {
            console.error(e)
        }
    }

}
