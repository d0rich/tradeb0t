import { Job } from 'node-schedule'
import { AbstractTradeAlgorithm, CreateOrderOptions, InputTypes, AlgorithmRun } from '@tradeb0t/core'
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

  async main(inputs: HammerInput) {
    const { order, seconds_before, date } = inputs

    const send_date = this.addSecondsToDate(new Date(date), -seconds_before)
    const algorithmRun = await this.commitStart(inputs, { send_date })

    try {
      this.initialize(algorithmRun, { send_date, order })
    } catch (e) {
      return this.commitError(algorithmRun.id, e as Error)
    }

    return algorithmRun
  }

  async resume(id: number) {
    const algorithmRun = await this.loadProgress(id)
    const { order } = algorithmRun.inputs
    const { send_date } = algorithmRun.state

    try {
      this.initialize(algorithmRun, { send_date, order })
    } catch (e) {
      return this.commitError(algorithmRun.id, e as Error)
    }

    return this.commitContinue(id)
  }

  async stop(id: number) {
    const stopData = this.stopState.get(id)
    if (!stopData) throw new Error(`Algorithm run with id:${id} was not found.`)
    stopData?.job?.cancel()
    return this.commitStop(id)
  }

  private initialize(
    algorithmRun: AlgorithmRun,
    opts: {
      send_date: Date
      order: CreateOrderOptions
    }
  ) {
    const { trader } = this
    const { send_date, order } = opts

    const job = trader.scheduleAction(async () => {
      await this.sendUntilNotRejected(order, algorithmRun.id)
      await this.commitFinish(algorithmRun.id)
    }, new Date(send_date))

    this.stopState.set(algorithmRun.id, { job })

    if (new Date(send_date) < new Date())
      throw new Error(`Hammer run with id:${algorithmRun.id} can't send orders in the past.`)
  }

  private async sendUntilNotRejected(order: CreateOrderOptions, run_id: number) {
    try {
      const status = await this.trader.sendOrder(order, this.name, run_id)
      if (status === 'rejected') await this.sendUntilNotRejected(order, run_id)
    } catch (e) {
      await this.commitError(run_id, e as Error)
    }
  }

  private addSecondsToDate(date: Date, seconds: number) {
    return new Date(date.getTime() + seconds * 1000)
  }
}
