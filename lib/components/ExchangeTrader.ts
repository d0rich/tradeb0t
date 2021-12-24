import {IExchangeTrader} from "../interfaces";
import {ExchangeWatcher} from "./";
import {api} from "../../config/ExchangeApi";
import {OrderOptions} from "../types";
import {TradeBot} from "../TradeBot";
const schedule = require('node-schedule');

export class ExchangeTrader implements IExchangeTrader{
    _tradebot: TradeBot;

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
        await api.limitOrder({figi: ticker, operation, lots, price})
    }

}
