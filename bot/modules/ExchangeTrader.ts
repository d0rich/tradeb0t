import {IExchangeTrader} from "../interfaces";
import {ExchangeWatcher} from ".";
import {api} from "../../config/ExchangeApi";
import {OrderOptions} from "../../types";
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
            await this.sendOrder(order)
        })
    }

    async sendOrder({operation, ticker, lots, price}: OrderOptions) {
        console.log(`${new Date().toISOString()} Sending order: `, {operation, ticker, lots, price})
        try {
            // @ts-ignore
            const { figi } = await api.searchOne({ ticker });
            const response = await api.limitOrder({figi, operation, lots, price})
            console.log(response)
        } catch (e: any) {
            console.error(e)
        }

    }

}
