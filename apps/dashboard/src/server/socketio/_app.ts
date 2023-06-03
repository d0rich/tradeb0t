import type { Server } from 'socket.io'
import type { LogObject } from '@/src/entities/logs/models/LogObject'
import { eventEmitter } from './eventEmitter'
import { config } from '../config'

export function configureSocketIO(io: Server) {
  eventEmitter.addListener('log:all', (data: LogObject) => {
    io.emit('log', data)
  })
  for (const bot of config.bots) {
    eventEmitter.addListener(`log:${bot.host}:${bot.port}`, (data: LogObject) => {
      io.emit(`log:${bot.host}:${bot.port}`, data)
    })
  }
}
