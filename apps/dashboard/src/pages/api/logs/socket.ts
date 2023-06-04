'use server'

import { Server } from 'socket.io'
import { configureSocketIO } from '@/src/server/socketio/_app'
import type { NextApiRequest, NextApiResponse } from 'next'

const SocketHandler = (req: NextApiRequest, res: NextApiResponse) => {
  // @ts-ignore
  if (res?.socket?.server?.io) {
  } else {
    // @ts-ignore
    const io = new Server(res.socket.server, {
      path: '/api/logs/socket',
      addTrailingSlash: false
    })
    configureSocketIO(io)
    // @ts-ignore
    res.socket.server.io = io
  }
  res.end()
}

export default SocketHandler
