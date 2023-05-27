import { Hookable } from 'hookable'
import { Job, JobCallback } from 'node-schedule'
import { OrderStatus, GetOrderType, OperationType, CommonDomain } from 'src/domain'
import { CreateOrderOptions } from 'src/api/trpc/schemas'

export interface IExchangeTraderHooks {
  orderSent: (order: GetOrderType<CommonDomain>, operation_type: OperationType, runId?: number) => void
}

export interface IExchangeTrader {
  readonly hooks: Hookable<IExchangeTraderHooks>

  scheduleAction(action: JobCallback, date: Date): Job
  scheduleOrder(date: Date, order: CreateOrderOptions, algorithm_name?: string, run_id?: number): Job
  sendOrder(orderDetails: CreateOrderOptions, algorithm_name?: string, run_id?: number): Promise<OrderStatus>
}
