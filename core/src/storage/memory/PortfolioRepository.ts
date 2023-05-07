import { FindManyOptions, EntityManager, Repository } from 'typeorm'
import { AssetBalance } from 'src/domain/models/memory/AssetBalance'
import { CurrencyBalance, SecurityBalance } from 'src/domain'

export class PortfolioRepository extends Repository<AssetBalance> {
  readonly securities: Repository<SecurityBalance>
  readonly currencies: Repository<CurrencyBalance>

  constructor(manager: EntityManager) {
    super(AssetBalance, manager)
    this.securities = manager.getRepository(SecurityBalance)
    this.currencies = manager.getRepository(CurrencyBalance)
  }

  async findPositions(options?: FindManyOptions<AssetBalance>) {
    const [currencies, securities] = await Promise.all([this.currencies.find(options), this.securities.find(options)])
    return [...currencies, ...securities]
  }
}
