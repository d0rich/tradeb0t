import {ExchangeWatcher} from "./index";
import {OrderDetails, OrderStatus} from "lib/utils/orderDetails";
import {TradeBot} from "../../TradeBot";
import {Job} from "node-schedule";
import { ExchangeClient } from "src/ExchangeClient/ExchangeClient";
import { BotLogger } from "./BotLogger";
import {C_Order} from "../../../src/exchangeClientTypes";
import {D_Order} from "@prisma/client";
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

    scheduleOrder(date: Date, order: OrderDetails, run_id: number | null = null, ): Job {
        return schedule.scheduleJob(date, async () => {
            await this.sendOrder(order, run_id)
        })
    }

    async sendOrder({ ticker, lots, price, operation }: OrderDetails, run_id: number | null = null): Promise<OrderStatus> {
        const { watcher } = this
        this.logger.log(`${run_id ? `[algo:${run_id}] `: ''}Sending order: ${JSON.stringify({operation, ticker, lots, price})}`)
        let order: C_Order
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
        }
        return watcher.onOrderSent(order, operation, run_id)
    }

}
