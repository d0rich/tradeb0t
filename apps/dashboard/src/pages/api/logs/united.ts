import { Server } from 'socket.io'
import { configureSocketIO } from '@/src/server/socketio/_app'
import type { NextApiRequest, NextApiResponse } from 'next'

const SocketHandler = (req: NextApiRequest, res: NextApiResponse) => {
  // @ts-ignore
  if (res?.socket?.server?.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    // @ts-ignore
    const io = new Server(res.socket.server, {
      path: '/api/logs/united',
      addTrailingSlash: false
    })
    configureSocketIO(io)
    io.on('connection', (socket) => {
      console.log('a user connected')
      socket.on('disconnect', () => {
        console.log('user disconnected')
      })
    })
    // @ts-ignore
    res.socket.server.io = io
  }
  res.end()
}

export default SocketHandler
