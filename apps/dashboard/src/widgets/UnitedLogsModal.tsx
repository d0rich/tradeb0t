import { io, type Socket } from 'socket.io-client'
import { useEffect, useState } from 'react'
import type { LogObject } from 'consola'

function useSocket(url: string) {
  const [socket, setSocket] = useState<Socket | null>(null)
  useEffect(() => {
    fetch(url).finally(() => {
      const socketio = io({
        path: url,
        addTrailingSlash: false
      })
      socketio.on('connect', () => {
        console.log('connect')
      })
      socketio.on('disconnect', () => {
        console.log('disconnect')
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

export interface UnitedLogsModalProps {
  className?: string
}

export default function UnitedLogsModal({ className = '' }: UnitedLogsModalProps) {
  const socket = useSocket('/api/logs/united')
  const [logs, setLogs] = useState<LogObject[]>([])

  socket?.on('log', (log: LogObject) => {
    setLogs((logs) => [...logs, log])
  })

  return <button className={`btn w-1/2 ${className}`}>United Logs</button>
}
