import { PaginationOptions } from 'src/api'
import type { FindManyOptions, Repository, ObjectLiteral, FindOptionsWhere } from 'typeorm'

export function getPaginationSelector(options: PaginationOptions): Pick<FindManyOptions, 'skip' | 'take'> {
  return {
    skip: (options.page - 1) * options.perPage,
    take: options.perPage
  }
}

export async function getTotalPages<Entity extends ObjectLiteral>(
  repository: Repository<Entity>,
  perPage: PaginationOptions['perPage'],
  filter: FindOptionsWhere<Entity> = {}
): Promise<number> {
  const total = await repository.count(filter)
  return Math.ceil(total / perPage)
}
