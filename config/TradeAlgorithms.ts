import {ExchangeAnalyzer, ExchangeTrader, ExchangeWatcher} from "../robot/components";
import {OrderOptions} from "../robot/types";

export class TradeAlgorithms{
    private _analyzer: ExchangeAnalyzer;

    constructor(analyzer: ExchangeAnalyzer) {
        this._analyzer = analyzer
    }

    get trader(): ExchangeTrader {return this._analyzer.trader}
    get watcher(): ExchangeWatcher {return this._analyzer.watcher}

    slicing(order: OrderOptions, parts: number, minutes: number){
        const lotsInOrder = Math.ceil(order.lots/parts)
        const lastLots = order.lots - lotsInOrder * (parts - 1)
        const lotsInOrders: number[] = []

        for (let i = 0; i < parts - 1; i++) {
            lotsInOrders.push(lotsInOrder)
        }

        lotsInOrders.push(lastLots)
        const date = new Date()
        lotsInOrders.forEach((lots, index) => {
            this.trader.scheduleOrder(
                {...order, lots},
                new Date(date.getTime() + 10_000 + 60_000 * minutes/(parts - 1) * index)
            )
        })
    }

    hammer(order: OrderOptions, time: Date){
        const hits = async () => {
            let success = false
            while (!success) {
                try {
                    await this.trader.sendOrder(order)
                    success = true
                }
                catch (e) {
                    success = false
                }
            }
        }
        this._analyzer.trader.scheduleAction(hits, new Date(time.getTime() - 60_000 * 2))
    }
}
