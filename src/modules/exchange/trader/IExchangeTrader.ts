import { Job, JobCallback } from 'node-schedule'
import { OrderStatus } from 'src/types'
import { CreateOrderOptions } from 'src/domain'

export interface IExchangeTrader {
  scheduleAction(action: JobCallback, date: Date): Job
  scheduleOrder(date: Date, order: CreateOrderOptions, algorithm_name?: string, run_id?: number): Job
  sendOrder(orderDetails: CreateOrderOptions, algorithm_name?: string, run_id?: number): Promise<OrderStatus>
}
