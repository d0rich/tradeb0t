import { Express } from 'express'
import { App, toNodeListener } from 'h3'
import { networkInterfaces } from 'os'
import http from 'http'
import ws, { WebSocketServer } from 'ws'
import colors from 'colors/safe'
import { ITradeBot } from '../ITradeBot'
import { initExpress, registerH3Routes, registerWSSHandler, initH3 } from 'src/api'
import { useConfig } from '../../config'
import { HandleError } from '../../decorators'
import { StubDomain } from 'src/domain'

export class ApiService {
  private readonly tradeBot: ITradeBot<StubDomain, unknown>
  private h3: App
  private wss: WebSocketServer
  private http: http.Server

  constructor(tradeBot: ITradeBot) {
    this.tradeBot = tradeBot
    this.configureServers()
  }

  @HandleError()
  private async configureServers() {
    const config = useConfig()
    this.h3 = initH3(this.tradeBot)
    registerH3Routes({
      tradeBot: this.tradeBot,
      h3App: this.h3
    })
    this.http = http.createServer(toNodeListener(this.h3))
    this.wss = new ws.Server({
      server: this.http
    })
    registerWSSHandler({
      wss: this.wss,
      tradeBot: this.tradeBot
    })
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
