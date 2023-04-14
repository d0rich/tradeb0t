import { DomainTemplate } from 'src/domain'
import { IExchangeTrader } from '../trader'
import { IExchangeWatcher } from '../watcher'
import {
  GetCurrencyType,
  CommonDomain,
  GetCurrencyBalanceType,
  GetSecurityType,
  GetPortfolioPositionType,
  GetOrderType
} from 'src/domain'
import { OperationType, Algorithm, AlgorithmRun } from 'src/db'
import { GetOrdersOptions } from 'src/types'
import { ITradeBot } from 'src/ITradeBot'

export interface IExchangeAnalyzer<Domain extends DomainTemplate, TExchangeApi> {
  readonly tradebot: ITradeBot<Domain, TExchangeApi>
  get trader(): IExchangeTrader
  get watcher(): IExchangeWatcher<Domain>
  start(): Promise<void>
  updateCurrencies(): Promise<GetCurrencyType<CommonDomain>[]>
  getCurrencies(): Promise<GetCurrencyType<CommonDomain>[]>
  updateCurrenciesBalance(): Promise<GetCurrencyBalanceType<CommonDomain>[]>
  getCurrenciesBalance(): Promise<GetCurrencyBalanceType<CommonDomain>[]>
  updateSecurities(): Promise<GetSecurityType<CommonDomain>[]>
  getSecurities(): Promise<GetSecurityType<CommonDomain>[]>
  getSecurity(ticker: string): Promise<GetSecurityType<CommonDomain>>
  addSecurities(...securities: GetSecurityType<CommonDomain>[]): Promise<GetSecurityType<CommonDomain>[]>
  getFollowedSecurities(): Promise<GetSecurityType<CommonDomain>[]>
  followSecurity(securityTicker: string): Promise<GetSecurityType<CommonDomain> | undefined>
  unfollowSecurity(securityTicker: string): Promise<GetSecurityType<CommonDomain> | undefined>
  updateFollowedSecurities(): Promise<GetSecurityType<CommonDomain>[]>
  updatePortfolio(): Promise<GetPortfolioPositionType<CommonDomain>[]>
  getPortfolio(): Promise<GetPortfolioPositionType<CommonDomain>[]>
  clearPortfolio(): Promise<number>
  saveOrder(
    order: GetOrderType<CommonDomain>,
    operation: OperationType,
    runId?: number
  ): Promise<GetOrderType<CommonDomain>>
  getOrders(options: GetOrdersOptions): Promise<GetOrderType<CommonDomain>[]>
  saveAlgorithms(): Promise<Algorithm[]>
  runAlgorithm(algorithmName: string, inputs: unknown, state?: unknown): Promise<AlgorithmRun>
  saveAlgorithmRunProgress(id: number, state: unknown): Promise<AlgorithmRun>
  loadAlgorithmRunProgress(id: number): Promise<AlgorithmRun | null>
  stopAlgorithmRun(id: number): Promise<AlgorithmRun>
  resumeAlgorithmRun(id: number): Promise<AlgorithmRun>
  finishAlgorithmRun(id: number): Promise<AlgorithmRun>
  errorAlgorithmRun(id: number, error: Error): Promise<AlgorithmRun>
  getAlgorithmRunsByAlgorithm(algorithmName: string): Promise<AlgorithmRun[]>
  getUnfinishedAlgorithmRuns(): Promise<AlgorithmRun[]>
}
