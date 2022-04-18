import {createRollingFileLogger, Logger} from "simple-node-logger";
import { wsApi } from "../../api";


export class BotLogger {
  private readonly _log: Logger
  private _lastLogs: string[]

  constructor(){
    this._log = createRollingFileLogger({
      logDirectory:'./logs',
      fileNamePattern:'trade-bot-<DATE>.log'
    })
    this._lastLogs = []
  }

  updateLastLogs(message: string){
    this._lastLogs.push(message)
    if (this._lastLogs.length > 30){
      this._lastLogs.shift()
    }
    console.log(this._lastLogs)
  }

  getLastLogs(): string{
    return this._lastLogs.join('\r\n')
  }

  log(message: string){
    this._log.info(message)
    wsApi.emit('log', message)
    this.updateLastLogs(message)
  }
}