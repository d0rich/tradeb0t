import { useEffect, useState } from 'react'
import type { LogObject } from 'consola'
import { useSocket } from '@/src/shared/api/socket'
import LogsOutput from '@/src/entities/logs/ui/LogsOutput'

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
        <div className="modal-box bg-base-200 relative !max-w-none w-screen">
          <label htmlFor={modalId} className="btn btn-sm btn-circle absolute right-2 top-2">
            ✕
          </label>
          <LogsOutput logs={logs} />
        </div>
      </div>
    </>
  )
}
