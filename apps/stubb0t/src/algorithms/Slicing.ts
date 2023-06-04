import { AbstractTradeAlgorithm, CreateOrderOptions, AlgorithmRun } from '@tradeb0t/core'
import { Job } from 'node-schedule'
import type { StubExchangeApi } from '../exchange'

export interface SlicingInput {
  order: CreateOrderOptions
  parts: number
  minutes: number
}
export interface SlicingState {
  orders_sended: number
  lots_in_orders: number[]
}
export interface SlicingStopData {
  jobs: Job[]
}

export class SlicingAlgorithm extends AbstractTradeAlgorithm<
  SlicingInput,
  SlicingState,
  SlicingStopData,
  StubExchangeApi
> {
  get name(): string {
    return 'slicing'
  }
  get description(): string {
    return 'Slicing algorithm splits defined order into multiple smaller orders and sends them during continuous time interval.'
  }
  get inputs(): any {
    return {
      order: 'OrderDetails',
      parts: 'number',
      minutes: 'number'
    }
  }

  async main(inputs: SlicingInput) {
    const { order, parts, minutes } = inputs
    const { trader } = this
    const lotsInOrder: number = Math.floor(order.lots / parts)
    let lastLots: number = order.lots % parts
    const lotsInOrders: number[] = []

    for (let i = 0; i < parts; i++) {
      lotsInOrders.push(lotsInOrder)
    }
    for (let i = lotsInOrders.length - 1; lastLots > 0; i--) {
      lotsInOrders[i] += 1
      lastLots -= 1
    }

    const algorithmRun = await this.commitStart(inputs, { orders_sended: 0, lots_in_orders: lotsInOrders })

    try {
      await this.initialize(algorithmRun, { orders_sended: 0, lots_in_orders: lotsInOrders, parts, minutes, order })
    } catch (e) {
      return this.commitError(algorithmRun.id, e as Error)
    }

    return algorithmRun
  }
  async resume(id: number) {
    const algorithmRun = await this.loadProgress(id)
    const { order, parts, minutes } = algorithmRun.inputs
    const { orders_sended, lots_in_orders } = algorithmRun.state

    try {
      await this.initialize(algorithmRun, { orders_sended, lots_in_orders, parts, minutes, order })
    } catch (e) {
      return this.commitError(algorithmRun.id, e as Error)
    }

    return this.commitContinue(id)
  }

  private async initialize(
    algorithmRun: AlgorithmRun,
    opts: {
      orders_sended: number
      parts: number
      lots_in_orders: number[]
      minutes: number
      order: CreateOrderOptions
    }
  ) {
    const { trader } = this
    const { orders_sended, parts, lots_in_orders, minutes, order } = opts
    const stopData: SlicingStopData = { jobs: [] }
    const startPoint = this.addSecondsToDate(new Date(), 10)
    const minutesRemain = minutes * (1 - orders_sended / parts)
    for (let i = orders_sended; i < lots_in_orders.length; i++) {
      const lots = lots_in_orders[i]
      const sendOrderTime: Date = this.addMinutesToDate(startPoint, (minutesRemain / (parts - 1)) * i)
      const newJob = trader.scheduleAction(async () => {
        try {
          await trader.sendOrder({ ...order, lots }, this.name, algorithmRun.id)
          if (i < lots_in_orders.length - 1)
            await this.saveProgress(algorithmRun.id, { orders_sended: i + 1, lots_in_orders })
          else await this.commitFinish(algorithmRun.id)
        } catch (e) {
          await this.commitError(algorithmRun.id, e as Error)
        }
      }, sendOrderTime)
      stopData.jobs.push(newJob)
    }
    this.stopState.set(algorithmRun.id, stopData)
    if (parts < 1) throw new Error('Parts must be greater than 0')
  }

  async stop(id: number) {
    const stopData = this.stopState.get(id)
    if (!stopData) throw new Error(`Algorithm run with id:${id} was not found.`)
    stopData.jobs.forEach((job) => {
      job.cancel()
    })
    return await this.commitStop(id)
  }

  private addSecondsToDate(date: Date, seconds: number) {
    return new Date(date.getTime() + seconds * 1000)
  }

  private addMinutesToDate(date: Date, minutes: number) {
    return new Date(date.getTime() + minutes * 60 * 1000)
  }
}
