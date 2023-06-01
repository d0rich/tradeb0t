import type { Server } from 'socket.io'
import type { LogObject } from 'consola'
import { eventEmitter } from './eventEmitter';

export function configureSocketIO(io: Server) {
  const ns = io.of('/united-logs')

  ns.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  })

  eventEmitter.on('log:all', (data: LogObject) => {
    ns.emit('log', data)
  })
}
