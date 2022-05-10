import { config } from '../../../config'
import { TradeBot } from 'bot/TradeBot'
import { Express } from 'express'
import { createWebSocketServer } from './ws'
import { expressApp } from './rest'
import http from 'http'
import { Server } from 'socket.io'

export class BotApi {
  private readonly _tradeBot: TradeBot
  private _restServer: Express
  private _webSocketServer: Server
  private _httpServer: http.Server

  constructor(tradeBot: TradeBot){
    this._tradeBot = tradeBot
    this.configureServers()
  }

  private async configureServers(){
    this._restServer = expressApp
    this._restServer.set('tradeBot', this._tradeBot)
    const { httpServer, webSocketServer } = createWebSocketServer({ tradeBot: this._tradeBot, expressApp: this._restServer })
    this._httpServer = httpServer
    this._webSocketServer = webSocketServer
    this._httpServer.listen(config.api.restPort, () => {
      console.info(`TradeBot is online on: `)
      console.info(`  http://${config.api.host}:${config.api.restPort}/`)
      console.info(`  ws://${config.api.host}:${config.api.wsPort}/`)
    })
  }

  public get webSocketServer(): Server { return this._webSocketServer }
  public get httpServer(): http.Server { return this._httpServer }
}