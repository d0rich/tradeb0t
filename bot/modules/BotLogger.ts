import fs from 'fs'
import { config } from '../../config';
import {createRollingFileLogger, Logger} from "simple-node-logger";
import { wsApi } from "../../api";


export class BotLogger {
  private readonly _log: Logger
  private _lastLogs: string[]

  private createLogsDirIfNotExist(){
    if (!fs.existsSync(config.logs.directory)) fs.mkdirSync(config.logs.directory)
  }

  constructor(){
    this.createLogsDirIfNotExist()
    this._log = createRollingFileLogger({
      logDirectory:config.logs.directory,
      fileNamePattern:'trade-bot-<DATE>.log'
    })
    this._lastLogs = []
  }

  updateLastLogs(message: string){
    this._lastLogs.push(message)
    if (this._lastLogs.length > 30){
      this._lastLogs.shift()
    }
  }

  getLastLogs(): string{
    return this._lastLogs.join('\r\n')
  }

  log(message: string){
    this._log.info(message)
    const messageWithTime = new Date().toLocaleString()+ ' ' + message
    console.log(messageWithTime)
    wsApi.emit('log', messageWithTime)
    this.updateLastLogs(messageWithTime)
  }
}