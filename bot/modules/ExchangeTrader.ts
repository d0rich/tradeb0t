import {IExchangeTrader} from "../interfaces";
import {ExchangeWatcher} from ".";
import {OperationTypes, OrderDetails} from "../../types";
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

    scheduleOrder(order: OrderDetails, date: Date) {
        schedule.scheduleJob(date, async () => {
            this.sendOrder(order)
        })
    }

    async sendOrder({ ticker, lots, price, operation }: OrderDetails) {
        this._tradebot.logger.log(`Sending order: ${JSON.stringify({operation, ticker, lots, price})}`)
        try {
            let order
            switch (operation){
                case OperationTypes.buy:
                    order = await this._tradebot.exchangeClient.tradeModule.buy({ ticker, lots, price, operation })
                    break
                case OperationTypes.buyOrCancel:
                    order = await this._tradebot.exchangeClient.tradeModule.buyOrCancel()
                    break
                case OperationTypes.sell:
                    order = await this._tradebot.exchangeClient.tradeModule.sell({ ticker, lots, price, operation })
                    break
                case OperationTypes.sellOrCancel:
                    order = await this._tradebot.exchangeClient.tradeModule.sellOrCancel()
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