import fs from 'fs'
import { createRollingFileLogger, Logger } from 'simple-node-logger'
import { createConsola, ConsolaInstance, LogObject, LogType } from 'consola'
import { EventEmitter } from 'events'
import { ITradeBot } from '../ITradeBot'
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
  readonly internalTypes: LogType[] = ['debug', 'silent']
  readonly consoleLogger: ConsolaInstance

  private readonly fileLogger: Logger
  private readonly lastLogs: LogObject[]
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

  // Different log types

  log(message: unknown, ...args: unknown[]) {
    this.logWithSpecificType('log', message, ...args)
  }

  info(message: unknown, ...args: unknown[]) {
    this.logWithSpecificType('info', message, ...args)
  }

  warn(message: unknown, ...args: unknown[]) {
    this.logWithSpecificType('warn', message, ...args)
  }

  error(message: unknown, ...args: unknown[]) {
    this.logWithSpecificType('error', message, ...args)
  }

  debug(message: unknown, ...args: unknown[]) {
    this.logWithSpecificType('debug', message, ...args)
  }

  fail(message: unknown, ...args: unknown[]) {
    this.logWithSpecificType('fail', message, ...args)
  }

  fatal(message: unknown, ...args: unknown[]) {
    this.logWithSpecificType('fatal', message, ...args)
  }

  ready(message: unknown, ...args: unknown[]) {
    this.logWithSpecificType('ready', message, ...args)
  }

  silent(message: unknown, ...args: unknown[]) {
    this.logWithSpecificType('silent', message, ...args)
  }

  start(message: unknown, ...args: unknown[]) {
    this.logWithSpecificType('start', message, ...args)
  }

  success(message: unknown, ...args: unknown[]) {
    this.logWithSpecificType('success', message, ...args)
  }

  trace(message: unknown, ...args: unknown[]) {
    this.logWithSpecificType('trace', message, ...args)
  }

  verbose(message: unknown, ...args: unknown[]) {
    this.logWithSpecificType('verbose', message, ...args)
  }

  // Subscriptions

  subscribe(callback: (logs: LogObject) => void) {
    this.eventEmitter.on('log', callback)
  }

  unsubscribe(callback: (logs: LogObject) => void) {
    this.eventEmitter.off('log', callback)
  }

  // Error handling utils

  createErrorHandlingProxy<T extends object>(object: T): T {
    const handler: ProxyHandler<T> = {
      get: (target, property) => {
        const value = target[property as keyof T]
        if (typeof value === 'function') {
          return (...args: unknown[]) => {
            try {
              const result = value.apply(target, args)
              if (result instanceof Promise) {
                result.catch((error) => this.error(error))
              }
              return result
            } catch (error) {
              this.error(error)
            }
          }
        }
        return value
      }
    }
    return new Proxy(object, handler)
  }

  private createLogsDirIfNotExist() {
    const config = this.tradebot.config
    if (!fs.existsSync(config.logs.directory)) fs.mkdirSync(config.logs.directory)
  }

  private logWithSpecificType(type: LogType, message: unknown, ...args: unknown[]) {
    this.logToFile(type, message, ...args)
    this.logToConsole(type, message, ...args)
    const logObj = this.consoleLogger._lastLog.object
    if (!logObj) return
    if (!this.internalTypes.includes(type)) {
      this.logToSocket(logObj)
    }
    this.updateLastLogs(logObj)
  }

  private logToFile(type: LogType, message: unknown, ...args: unknown[]) {
    if (type === 'log') this.fileLogger.debug(message, ...args)
    else if (type === 'info') this.fileLogger.info(message, ...args)
    else if (type === 'error') this.fileLogger.error(message, ...args)
    else if (type === 'warn') this.fileLogger.warn(message, ...args)
    else if (type === 'debug') this.fileLogger.debug(message, ...args)
    else if (type === 'fail') this.fileLogger.error(message, ...args)
    else if (type === 'fatal') this.fileLogger.fatal(message, ...args)
    else if (type === 'ready') this.fileLogger.info(message, ...args)
    else if (type === 'silent') this.fileLogger.debug(message, ...args)
    else if (type === 'start') this.fileLogger.info(message, ...args)
    else if (type === 'success') this.fileLogger.info(message, ...args)
    else if (type === 'trace') this.fileLogger.trace(message, ...args)
    else if (type === 'verbose') this.fileLogger.info(message, ...args)
  }

  private logToConsole(type: LogType, message: unknown, ...args: unknown[]) {
    if (type === 'log') this.consoleLogger.log(message, ...args)
    else if (type === 'info') this.consoleLogger.info(message, ...args)
    else if (type === 'error') this.consoleLogger.error(message, ...args)
    else if (type === 'warn') this.consoleLogger.warn(message, ...args)
    else if (type === 'debug') this.consoleLogger.debug(message, ...args)
    else if (type === 'fail') this.consoleLogger.fail(message, ...args)
    else if (type === 'fatal') this.consoleLogger.fatal(message, ...args)
    else if (type === 'ready') this.consoleLogger.ready(message, ...args)
    else if (type === 'silent') this.consoleLogger.silent(message, ...args)
    else if (type === 'start') this.consoleLogger.start(message, ...args)
    else if (type === 'success') this.consoleLogger.success(message, ...args)
    else if (type === 'trace') this.consoleLogger.trace(message, ...args)
    else if (type === 'verbose') this.consoleLogger.verbose(message, ...args)
  }

  private logToSocket(log: LogObject) {
    this.eventEmitter.emit('log', log)
  }

  private updateLastLogs(log: LogObject) {
    this.lastLogs.push(log)
    if (this.lastLogs.length > 30) {
      this.lastLogs.shift()
    }
  }
}
