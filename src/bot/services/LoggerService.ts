import fs from 'fs'
import { createRollingFileLogger, Logger } from 'simple-node-logger'
import { EventEmitter } from 'events'
import colors from 'colors/safe'
import { ITradeBot } from '../ITradeBot'

interface LogToStringOptions {
  useColors?: boolean
  showRobotId?: boolean
  showType?: boolean
  showTimestamp?: boolean
  showAlgorithmName?: boolean
  showAlgorithmRunId?: boolean
  showAlgorithmState?: boolean
  showAttachment?: boolean
}

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
  private readonly tradebot: ITradeBot
  private readonly logger: Logger
  private readonly lastLogs: SocketLogs[]
  private readonly eventEmitter = new EventEmitter()

  constructor(tradeBot: ITradeBot) {
    this.createLogsDirIfNotExist()
    this.tradebot = tradeBot
    this.logger = createRollingFileLogger({
      logDirectory: this.tradebot.config.logs.directory,
      fileNamePattern: 'trade-bot-<DATE>.log'
    })
    this.lastLogs = []
  }

  getLastLogs() {
    return this.lastLogs
  }

  log(body: Omit<Omit<SocketLogs, 'robot_id'>, 'timestamp'>, { internal = false } = {}) {
    const newLog: SocketLogs = {
      robot_id: 'test',
      timestamp: new Date().toISOString(),
      ...body
    }
    this.logToFile(newLog)
    this.logToConsole(newLog)
    if (!internal) this.logToSocket(newLog)
    this.updateLastLogs(newLog)
  }

  subscribe(callback: (logs: SocketLogs) => void) {
    this.eventEmitter.on('log', callback)
  }

  unsubscribe(callback: (logs: SocketLogs) => void) {
    this.eventEmitter.off('log', callback)
  }

  createErrorHandlingProxy<T extends object>(object: T): T {
    const logError = (className: string, methodName: string, error: Error) => {
      this.log({
        type: 'error',
        message: `Error in ${className}.${methodName}: ${error.message}`,
        attachment: error
      })
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

  private logToString(
    log: SocketLogs,
    {
      useColors = false,
      showRobotId = true,
      showType = true,
      showTimestamp = true,
      showAlgorithmName = true,
      showAlgorithmRunId = true,
      showAlgorithmState = true,
      showAttachment = true
    }: LogToStringOptions = {}
  ) {
    // Show or hide
    let robotId = showRobotId ? log.robot_id : ''
    let type = showType ? log.type : ''
    let timestamp = showTimestamp ? log.timestamp : ''
    const algorithmName = showAlgorithmName ? log.algorithm?.name ?? '' : ''
    const algorithmRunId = showAlgorithmRunId ? log.algorithm?.run_id ?? '' : ''
    let algorithmState = showAlgorithmState ? (log.algorithm?.state ? JSON.stringify(log.algorithm.state) : '') : ''
    let algorithmInputs = showAlgorithmState ? (log.algorithm?.inputs ? JSON.stringify(log.algorithm.inputs) : '') : ''
    let attachment = showAttachment ? (log.attachment ? JSON.stringify(log.attachment) : '') : ''

    // Apply layout
    robotId = robotId ? `<${robotId}>` : ''
    type = type ? `[${type.toUpperCase()}]` : ''
    let algorithmRun =
      algorithmName || algorithmRunId ? `<${algorithmName ?? 'algo'}${algorithmRunId ? ':' : ''}${algorithmRunId}>` : ''
    algorithmState = algorithmState ? `${algorithmRun ? 'Algorithm state' : 'State'}: ${algorithmState}` : ''
    algorithmInputs = algorithmInputs ? `${algorithmRun ? 'Algorithm inputs' : 'Inputs'}: ${algorithmInputs}` : ''
    attachment = attachment ? `Attachment: ${attachment}` : ''

    // Apply colors
    if (useColors) {
      timestamp = timestamp ? colors.grey(timestamp) : ''
      robotId = robotId ? colors.green(robotId) : ''
      if (type)
        switch (log.type) {
          case 'info':
            type = colors.blue(type)
            break
          case 'error':
            type = colors.red(type)
            break
          case 'warning':
            type = colors.yellow(type)
            break
        }
      algorithmRun = algorithmRun ? colors.cyan(algorithmRun) : ''
      algorithmState = algorithmState ? colors.bgMagenta(algorithmRun) : ''
      algorithmInputs = algorithmInputs ? colors.bgBlue(algorithmInputs) : ''
      attachment = attachment ? colors.bgGreen(attachment) : ''
    }

    const result =
      `${timestamp} ${robotId} ${type} ${log.message}` +
      `${algorithmRun || algorithmState ? ' | ' : ''} ${algorithmRun} ${algorithmState} ${algorithmInputs}` +
      `${attachment ? ' | ' : ''} ${attachment}`
    return result.trim()
  }

  private logToFile(log: SocketLogs) {
    const output = this.logToString(log, {
      showTimestamp: false,
      showRobotId: false,
      showType: false
    })
    if (log.type === 'info') this.logger.info(output)
    else if (log.type === 'error') this.logger.error(output)
    else if (log.type === 'warning') this.logger.warn(output)
  }

  private logToConsole(log: SocketLogs) {
    console.log(
      this.logToString(log, {
        useColors: true
      })
    )
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
