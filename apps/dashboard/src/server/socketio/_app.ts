import type { Server } from 'socket.io'
import type { LogObject } from 'consola'
import { eventEmitter } from './eventEmitter'

export function configureSocketIO(io: Server) {
  eventEmitter.addListener('log:all', (data: LogObject) => {
    io.emit('log', data)
  })
}
