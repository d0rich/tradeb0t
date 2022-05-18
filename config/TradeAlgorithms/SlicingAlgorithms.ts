import { D_Algorithm, D_AlgorithmRun } from "@prisma/client";
import { ExchangeAnalyzer } from "bot/modules";
import { TradeBot } from "bot/TradeBot";
import { OrderDetails } from "types";
import { AbstractTradeAlgorithm } from "./AbstractTradeAlgorithm";

export class SlicingAlgorithm extends AbstractTradeAlgorithm {
  get name(): string { return 'slicing' }
  get description(): string { return 'slicing' }
  get inputs(): any { 
    return {
      order: 'OrderDetails',
      parts: 'number',
      minutes: 'number'
    } 
  }
  
  constructor(analyzer: ExchangeAnalyzer){
    super(analyzer)
  }
  
  async main(inputs: { order: OrderDetails, parts: number, minutes: number }): Promise<D_AlgorithmRun> {
    const { order, parts, minutes } = inputs
    const { trader } = this
    const lotsInOrder: number = Math.floor(order.lots / parts)
    const lastLots: number =  order.lots % lotsInOrder
    const lotsInOrders: number[] = []

    for (let i = 0; i < parts - 1; i++) {
      lotsInOrders.push(lotsInOrder)
    }
    lotsInOrders.push(lotsInOrder + lastLots)

    const algorithmRun: D_AlgorithmRun = await this.start(inputs, { orders_sended: 0, lots_in_orders: lotsInOrders })

    const startPoint = new Date()
    for (let i = 0; i < lotsInOrders.length; i ++) {
      const lots = lotsInOrders[i]
      const sendOrderTime: Date = new Date(startPoint.getTime() + 10_000 + 60_000 * minutes/(parts - 1) * i)
      trader.scheduleAction(() => {
        trader.sendOrder({...order, lots})
        if (i < lotsInOrders.length - 1) this.saveProgress(algorithmRun.id, { orders_sended: i + 1, lots_in_orders: lotsInOrders })
        else this.finish(algorithmRun.id)
      }, sendOrderTime)
    }

    return algorithmRun
  }
  async continue(id: number): Promise<D_AlgorithmRun> {
    const algorithmRun: D_AlgorithmRun | null = await this.loadProgress(id)
    if (!algorithmRun) throw new Error(`Algorithm run with id ${id} was not found`)
    const { order, parts, minutes } = JSON.parse(algorithmRun.inputs)
    const { orders_sended, lots_in_orders } = JSON.parse(algorithmRun.state)
    const { trader } = this

    const minutesRemain = minutes * (1 - orders_sended / parts)
    const startPoint = new Date()
    for (let i = 0; i < lots_in_orders.length; i ++) {
      const lots = lots_in_orders[i]
      const sendOrderTime: Date = new Date(startPoint.getTime() + 10_000 + 60_000 * minutesRemain/(parts - 1) * i)
      trader.scheduleAction(() => {
        trader.sendOrder({...order, lots})
        if (i < lots_in_orders.length - 1) this.saveProgress(algorithmRun.id, { orders_sended: i + 1, lots_in_orders })
        else this.finish(algorithmRun.id)
      }, sendOrderTime)
    }
    return algorithmRun
  }

}