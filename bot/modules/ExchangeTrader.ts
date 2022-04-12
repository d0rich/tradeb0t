import {IExchangeTrader} from "../interfaces";
import {ExchangeWatcher} from ".";
import {OrderDetails, OrderOptions} from "../../types";
import {TradeBot} from "../TradeBot";
const schedule = require('node-schedule');

export class ExchangeTrader implements IExchangeTrader{
    private _tradebot: TradeBot;

    constructor(tradebot: TradeBot) {
        this._tradebot = tradebot
    }

    get watcher(): ExchangeWatcher {
        return this._tradebot.watcher
    }

    scheduleAction(action: Function, date: Date) {
        schedule.scheduleJob(date, action)
    }

    scheduleOrder(order: OrderOptions, date: Date) {
        schedule.scheduleJob(date, async () => {
            switch (order.operation) {
                case 'Buy':
                    await this.buy(order)
                    break;
                case 'Sell':
                    await this.sell(order)
                    break
                default:
                    await this.buy(order)
                    break;
            }
        })
    }

    async sell({ ticker, lots, price }: OrderDetails) {
        console.log(`${new Date().toISOString()} Sending order: `, {operation: 'Sell', ticker, lots, price})
        try {
            const order = await this._tradebot.exchangeApi.tradeModule.sell({ ticker, lots, price })
            console.log(order)
        } catch (e: any) {
            console.error(e)
        }
    }
    async buy({ ticker, lots, price }: OrderDetails) {
        console.log(`${new Date().toISOString()} Sending order: `, {operation: 'Buy', ticker, lots, price})
        try {
            const order = await this._tradebot.exchangeApi.tradeModule.buy({ ticker, lots, price })
            console.log(order)
        } catch (e: any) {
            console.error(e)
        }
    }
    async sellOrCancel() {
        throw new Error("Method not implemented.");
    }
    async buyOrCancel() {
        throw new Error("Method not implemented.");
    }

}
