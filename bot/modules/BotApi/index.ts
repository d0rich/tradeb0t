import { config } from '../../../config'
import { TradeBot } from 'bot/TradeBot'
import { Express } from 'express'
import { WebSocketServer } from 'ws'
import { configureWebSocketServer } from './ws'
import { expressApp } from './rest'

export class BotApi {
  private readonly _tradeBot: TradeBot
  private _rest: Express
  private _webSocket: WebSocketServer

  constructor(tradeBot: TradeBot){
    this._tradeBot = tradeBot
    this.configureServers()
  }

  private async configureServers(){
    let restReady = false
    this._webSocket = new WebSocketServer({ 
      port: config.api.wsPort,  
      host: config.api.host
    })
    this._rest = expressApp
    this._rest.set('tradeBot', this._tradeBot)
    configureWebSocketServer(this._webSocket, this._tradeBot)
    this._rest.listen(config.api.restPort, config.api.host, () => {
      restReady = true
    })
    while (!restReady){
      await awaitTime(10)
    }
    console.info(`TradeBot is online on: `)
    console.info(`  http://${config.api.host}:${config.api.restPort}/`)
    console.info(`  ws://${config.api.host}:${config.api.wsPort}/`)
  }

  public get webSocket(): WebSocketServer { return this._webSocket }
}

async function awaitTime(ms: number) {
  return new Promise((resolve) => {
    setTimeout(() => {resolve(true)}, ms)
  })
} 