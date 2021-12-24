import {IExchangeTrader} from "../interfaces";
import {ExchangeWatcher, ExchangeAnalyzer} from "./";
import {api} from "../../config/ExchangeApi";
import {OrderOptions} from "../types";
const schedule = require('node-schedule');

export class ExchangeTrader implements IExchangeTrader{
    watcher: ExchangeWatcher;

    setExchangeWatcher(exchangeWatcher: ExchangeWatcher) {
        this.watcher = exchangeWatcher
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
