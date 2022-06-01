import { D_AlgorithmRun } from "@prisma/client";
import { ExchangeAnalyzer } from "../../lib/modules";
import { AbstractTradeAlgorithm } from "../../lib/modules/TradeBot/ExchangeAnalyzer/TradeAlgorithms";
import { addSecondsToDate, OrderDetails } from '../../lib/utils'

type HammerInput = {
  order: OrderDetails,
  date: Date,
  seconds_before: number
}
type HammerState = {
  send_date: Date
}

export class HammerAlgorithm extends AbstractTradeAlgorithm<HammerInput, HammerState> {
  get name(): string { return 'hammer' }
  get description(): string { return 'hammer' }
  get inputs(): any {
    return {
      order: 'OrderDetails',
      date: 'Date',
      seconds_before: 'number'
    }
  }

  constructor(analyzer: ExchangeAnalyzer){
    super(analyzer)
  }

  async sendUntilNotRejected(order: OrderDetails, run_id: number) {
    const status = await this.trader.sendOrder(order, run_id)
    if (status === 'rejected') await this.sendUntilNotRejected(order, run_id)
  }

  async main(inputs: HammerInput): Promise<D_AlgorithmRun> {
    const { order, seconds_before, date } = inputs
    const { trader } = this

    const send_date = addSecondsToDate(new Date(date), -seconds_before)

    const algorithmRun: D_AlgorithmRun = await this.start(inputs, { send_date })

    trader.scheduleAction(async () => {
      await this.sendUntilNotRejected(order, algorithmRun.id)
      await this.finish(algorithmRun.id)
    }, send_date)

    return algorithmRun
  }

  async continue(id: number): Promise<D_AlgorithmRun> {
    const algorithmRun: D_AlgorithmRun = await this.loadProgress(id)
    const { order } = JSON.parse(algorithmRun.inputs)
    const { send_date } = JSON.parse(algorithmRun.state)
    const { trader } = this

    trader.scheduleAction(async () => {
      await this.sendUntilNotRejected(order, algorithmRun.id)
      await this.finish(algorithmRun.id)
    }, new Date(send_date))

    return algorithmRun
  }

}
