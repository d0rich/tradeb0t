import { Repository, FindOptionsWhere, Between } from 'typeorm'
import { Order, CommonDomain, GetOrderType, OperationType } from 'src/domain'
import { GetOrdersOptions } from 'src/api/trpc/schemas'
import { createHooks } from 'hookable'
import type { MaybePromise } from '@trpc/server'

export interface IOrdersRepositoryHooks {
  beforeSaveOne: (ticker: string) => MaybePromise<void>
}

export class OrdersRepository extends Repository<Order> {
  readonly hooks = createHooks<IOrdersRepositoryHooks>()

  async saveOne(
    order: GetOrderType<CommonDomain>,
    operation: OperationType,
    runId: number
  ): Promise<GetOrderType<CommonDomain>> {
    await this.hooks.callHook('beforeSaveOne', order.securityTicker)
    await this.upsert(
      {
        ...order,
        operation,
        algorithmRunId: runId
      },
      {
        conflictPaths: ['exchangeId']
      }
    )
    const result = await this.findOneBy({
      exchangeId: order.exchangeId
    })
    if (!result) throw new Error(`Order was not saved successfully: ${order}`)
    return result
  }

  async search(options: GetOrdersOptions): Promise<GetOrderType<CommonDomain>[]> {
    const query: FindOptionsWhere<Order> = {
      updatedAt: Between(options.from ?? new Date(0), options.to ?? new Date())
    }
    if (options.operation) {
      query.operation = options.operation
    }
    if (options.securityTicker) {
      query.securityTicker = options.securityTicker
    }
    if (options.runId) {
      query.algorithmRunId = options.runId
    }
    return this.find({
      where: query,
      order: {
        updatedAt: 'DESC'
      }
    })
  }
}
