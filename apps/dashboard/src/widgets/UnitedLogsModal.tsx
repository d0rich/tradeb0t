import { io, type Socket } from 'socket.io-client'
import { useEffect, useState } from 'react'
import type { LogObject } from 'consola'

function useSocket(url: string) {
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

export interface UnitedLogsModalProps {
  className?: string
}

export default function UnitedLogsModal({ className = '' }: UnitedLogsModalProps) {
  const socket = useSocket('/api/logs/united')
  const modalId = `united-logs-modal-checkbox`
  const [logs, setLogs] = useState<LogObject[]>([])

  useEffect(() => {
    socket?.on('log', (log: LogObject) => {
      setLogs((logs) => [...logs, log])
    })
  }, [socket])

  return (
    <>
      <label htmlFor={modalId} className={`btn w-1/2 ${className}`}>
        United Logs
      </label>
      <input type="checkbox" id={modalId} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box bg-base-200 relative">
          <label htmlFor={modalId} className="btn btn-sm btn-circle absolute right-2 top-2">
            ✕
          </label>
          {logs.map((log, index) => {
            return (
              <div key={index} className="modal-box bg-base-200 relative">
                <div className="modal-header">
                  <div className="flex-1">
                    <h2 className="text-lg font-bold">
                      [{log.level}] {log.message}
                    </h2>
                  </div>
                </div>
                <div className="modal-body">
                  <p>{JSON.stringify(log.args)}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
