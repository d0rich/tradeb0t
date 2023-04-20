import { Hookable } from 'hookable'
import { Job, JobCallback } from 'node-schedule'
import { CreateOrderOptions, OrderStatus, GetOrderType, OperationType, DomainTemplate } from 'src/domain'

export interface IExchangeTraderHooks<Domain extends DomainTemplate> {
  orderSent: (order: GetOrderType<Domain>, operation_type: OperationType, runId?: number) => void
}

export interface IExchangeTrader<Domain extends DomainTemplate> {
  readonly hooks: Hookable<IExchangeTraderHooks<Domain>>

  scheduleAction(action: JobCallback, date: Date): Job
  scheduleOrder(date: Date, order: CreateOrderOptions, algorithm_name?: string, run_id?: number): Job
  sendOrder(orderDetails: CreateOrderOptions, algorithm_name?: string, run_id?: number): Promise<OrderStatus>
}
