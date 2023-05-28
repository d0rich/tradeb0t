import { Job } from 'node-schedule'
import { AbstractTradeAlgorithm, CreateOrderOptions, InputTypes } from '@tradeb0t/core'
import type { StubExchangeApi } from '../exchange'

export interface HammerInput {
  order: CreateOrderOptions
  date: Date
  seconds_before: number
}
export interface HammerState {
  send_date: Date
}
export interface HammerStopData {
  job: Job
}

export class HammerAlgorithm extends AbstractTradeAlgorithm<HammerInput, HammerState, HammerStopData, StubExchangeApi> {
  get name(): string {
    return 'hammer'
  }
  get description(): string {
    return 'hammer'
  }
  get inputs(): InputTypes {
    return {
      order: 'OrderDetails',
      date: 'Date',
      seconds_before: 'number'
    }
  }

  async sendUntilNotRejected(order: CreateOrderOptions, run_id: number) {
    try {
      const status = await this.trader.sendOrder(order, this.name, run_id)
      if (status === 'rejected') await this.sendUntilNotRejected(order, run_id)
    } catch (e) {
      await this.commitError(run_id, e as Error)
    }
  }

  async main(inputs: HammerInput) {
    const { order, seconds_before, date } = inputs
    const { trader } = this

    const send_date = this.addSecondsToDate(new Date(date), -seconds_before)

    const algorithmRun = await this.commitStart(inputs, { send_date })

    const job = trader.scheduleAction(async () => {
      await this.sendUntilNotRejected(order, algorithmRun.id)
      await this.commitFinish(algorithmRun.id)
    }, send_date)

    this.stopState.set(algorithmRun.id, { job })

    return algorithmRun
  }

  async resume(id: number) {
    const algorithmRun = await this.loadProgress(id)
    const { order } = algorithmRun.inputs
    const { send_date } = algorithmRun.state
    const { trader } = this

    const job = trader.scheduleAction(async () => {
      await this.sendUntilNotRejected(order, algorithmRun.id)
      await this.commitFinish(algorithmRun.id)
    }, new Date(send_date))

    this.stopState.set(algorithmRun.id, { job })

    return await this.commitContinue(id)
  }

  async stop(id: number) {
    const stopData = this.stopState.get(id)
    if (!stopData) throw new Error(`Algorithm run with id:${id} was not found.`)
    stopData?.job?.cancel()
    return await this.commitStop(id)
  }

  private addSecondsToDate(date: Date, seconds: number) {
    return new Date(date.getTime() + seconds * 1000)
  }
}
