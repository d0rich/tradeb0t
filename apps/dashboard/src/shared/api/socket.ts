import { useEffect, useState } from 'react'
import { io, type Socket } from 'socket.io-client'

export function useSocket(url: string) {
  'use client'
  const [socket, setSocket] = useState<Socket | null>(null)
  useEffect(() => {
    fetch(url).finally(() => {
      const socketio = io({
        path: url,
        addTrailingSlash: false
      })
      setSocket(socketio)
    })
    function cleanup() {
      socket?.disconnect()
    }
    return cleanup
  }, [])
  return socket
}
