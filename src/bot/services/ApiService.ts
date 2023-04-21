import { networkInterfaces } from 'os'
import http from 'http'
import colors from 'colors/safe'
import { ITradeBot } from '../ITradeBot'
import { initH3WithWss } from 'src/api'
import { StubDomain } from 'src/domain'

export class ApiService {
  private readonly tradeBot: ITradeBot<StubDomain, unknown>

  private http: http.Server

  constructor(tradeBot: ITradeBot) {
    this.tradeBot = tradeBot
    this.configureServers()
  }

  private async configureServers() {
    const config = this.tradeBot.config
    const logger = this.tradeBot.logger.consoleLogger
    this.http = await initH3WithWss(this.tradeBot)
    this.http.listen(config.api.port, () => {
      logger.ready(`TradeBot is online`)
      if (config.api.host === '0.0.0.0') {
        const nets = networkInterfaces()
        const ipAddresses: string[] = []
        for (const net in nets) {
          nets[net]?.forEach((n) => {
            if (n.family === 'IPv4') ipAddresses.push(n.address)
          })
        }
        logger.info(`REST API:`)
        for (const addr of ipAddresses) {
          logger.log(`    ${colors.grey('-')} http://${addr.replace('127.0.0.1', 'localhost')}:${config.api.port}/`)
        }
        logger.info(`WebSocket:`)
        for (const addr of ipAddresses) {
          logger.log(`    ${colors.grey('-')} ws://${addr.replace('127.0.0.1', 'localhost')}:${config.api.port}/`)
        }
      } else {
        console.info(`REST API - http://${config.api.host}:${config.api.port}/`)
        console.info(`WebSocket - ws://${config.api.host}:${config.api.port}/`)
      }
    })
  }
}
