import fs from 'fs'
import { createRollingFileLogger, Logger } from 'simple-node-logger'
import { createConsola, consola, ConsolaInstance } from 'consola'
import { EventEmitter } from 'events'
import { ITradeBot } from '../ITradeBot'

type LogType = 'log' | 'info' | 'error' | 'warning'
export interface SocketLogs {
  robot_id: string
  type: 'info' | 'error' | 'warning'
  message: string
  attachment?: unknown
  algorithm?: {
    name: string
    run_id?: number
    inputs?: unknown
    state?: unknown
  }
  timestamp: string
}

export class LoggerService {
  private readonly consoleLogger: ConsolaInstance
  private readonly fileLogger: Logger
  private readonly lastLogs: SocketLogs[]
  private readonly eventEmitter = new EventEmitter()

  constructor(private readonly tradebot: ITradeBot) {
    this.consoleLogger = createConsola({
      formatOptions: {
        date: true
      }
    }).withTag('test')
    this.createLogsDirIfNotExist()
    this.fileLogger = createRollingFileLogger({
      logDirectory: this.tradebot.config.logs.directory,
      fileNamePattern: 'trade-bot-<DATE>.log'
    })
    this.lastLogs = []
  }

  getLastLogs() {
    return this.lastLogs
  }

  log(message: unknown, ...args: unknown[]) {
    this.logWithSpecificType('log', message, ...args)
  }

  info(message: unknown, ...args: unknown[]) {
    this.logWithSpecificType('info', message, ...args)
  }

  warn(message: unknown, ...args: unknown[]) {
    this.logWithSpecificType('warning', message, ...args)
  }

  error(message: unknown, ...args: unknown[]) {
    this.logWithSpecificType('error', message, ...args)
  }

  subscribe(callback: (logs: SocketLogs) => void) {
    this.eventEmitter.on('log', callback)
  }

  unsubscribe(callback: (logs: SocketLogs) => void) {
    this.eventEmitter.off('log', callback)
  }

  createErrorHandlingProxy<T extends object>(object: T): T {
    const logError = (className: string, methodName: string, error: Error) => {
      this.error(`Error in ${className}.${methodName}:`, error)
    }

    return new Proxy(object, {
      get: (target, property) => {
        const value = target[property as keyof T]
        if (typeof value === 'function') {
          return (...args: unknown[]) => {
            try {
              const result = value.apply(target, args)
              if (result instanceof Promise) {
                result.catch((error) => logError(target.constructor.name, property as string, error as Error))
              }
              return result
            } catch (error) {
              logError(target.constructor.name, property as string, error as Error)
            }
          }
        }
        return value
      }
    })
  }

  private createLogsDirIfNotExist() {
    const config = this.tradebot.config
    if (!fs.existsSync(config.logs.directory)) fs.mkdirSync(config.logs.directory)
  }

  private logWithSpecificType(type: LogType, message: unknown, ...args: unknown[]) {
    this.logToFile(type, message, ...args)
    this.logToConsole(type, message, ...args)
    // if (!internal) this.logToSocket(newLog)
    // this.updateLastLogs(newLog)
  }

  private logToFile(type: LogType, message: unknown, ...args: unknown[]) {
    if (type === 'log') this.fileLogger.debug(message, ...args)
    else if (type === 'info') this.fileLogger.info(message, ...args)
    else if (type === 'error') this.fileLogger.error(message, ...args)
    else if (type === 'warning') this.fileLogger.warn(message, ...args)
  }

  private logToConsole(type: LogType, message: unknown, ...args: unknown[]) {
    if (type === 'log') this.consoleLogger.log(message, ...args)
    else if (type === 'info') this.consoleLogger.info(message, ...args)
    else if (type === 'error') this.consoleLogger.error(message, ...args)
    else if (type === 'warning') this.consoleLogger.warn(message, ...args)
  }

  private logToSocket(log: SocketLogs) {
    this.eventEmitter.emit('log', log)
  }

  private updateLastLogs(log: SocketLogs) {
    this.lastLogs.push(log)
    if (this.lastLogs.length > 30) {
      this.lastLogs.shift()
    }
  }
}
