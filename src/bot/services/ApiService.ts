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
    this.http = await initH3WithWss(this.tradeBot)
    this.http.listen(config.api.port, () => {
      console.info(`${colors.blue('[i]')} TradeBot is online on: `)
      if (config.api.host === '0.0.0.0') {
        const nets = networkInterfaces()
        const ipAddresses: string[] = []
        for (const net in nets) {
          nets[net]?.forEach((n) => {
            if (n.family === 'IPv4') ipAddresses.push(n.address)
          })
        }
        console.info(`    ${colors.blue('[i]')} REST API:`)
        for (const addr of ipAddresses) {
          console.info(`        ${colors.grey('-')} http://${addr}:${config.api.port}/`)
        }
        console.info(`    ${colors.blue('[i]')} WebSocket:`)
        for (const addr of ipAddresses) {
          console.info(`        ${colors.grey('-')} ws://${addr}:${config.api.port}/`)
        }
      } else {
        console.info(`    ${colors.blue('[i]')} REST API - http://${config.api.host}:${config.api.port}/`)
        console.info(`    ${colors.blue('[i]')} WebSocket - ws://${config.api.host}:${config.api.port}/`)
      }
    })
  }
}
