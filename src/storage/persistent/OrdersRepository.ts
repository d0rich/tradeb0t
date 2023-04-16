import { Repository } from 'typeorm'
import { Order, CommonDomain, GetOrderType, OperationType } from 'src/domain'
import { GetOrdersOptions } from 'src/api/trpc/schemas'

export class OrdersRepository extends Repository<Order> {
  async saveOne(
    order: GetOrderType<CommonDomain>,
    operation: OperationType,
    runId?: number
  ): Promise<GetOrderType<CommonDomain>> {
    // TODO: load securities with Hookable
    // await this.loadSecurityIfNotExist(order.securityTicker)
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
    // TODO: Rewrite to typed selector
    let queryBuilder = this.createQueryBuilder('order')
      .where('order.updatedAt > :from', { from: Number(options.from ?? 0) })
      .andWhere('order.updatedAt < :to', { from: Number(options.to ?? new Date()) })
    if (options.operation)
      queryBuilder = queryBuilder.andWhere('order.operation = :operation', {
        operation: options.operation
      })
    if (options.securityTicker)
      queryBuilder = queryBuilder.andWhere('order.securityTicker = :securityTicker', {
        securityTicker: options.securityTicker
      })
    if (options.runId)
      queryBuilder = queryBuilder.andWhere('order.algorithmRunId = :runId', {
        runId: options.runId
      })
    return await queryBuilder.getMany()
  }
}
