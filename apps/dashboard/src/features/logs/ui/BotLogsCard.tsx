import { useEffect, useState } from 'react'
import BotLogsCardWothoutConnection from "@/src/entities/logs/ui/BotLogsCard"
import type { LogObject } from '@/src/entities/logs/models/LogObject'
import { useSocket } from '@/src/shared/api/socket'

export default function BotLogsCard() {

  const socket = useSocket('/api/logs/united')
  const [logs, setLogs] = useState<LogObject[]>([])

  useEffect(() => {
    socket?.on('log', (log: LogObject) => {
      setLogs((logs) => [...logs, log])
    })
  }, [socket])

  return (
    <BotLogsCardWothoutConnection
      header={<h2>Logs</h2>}
      logs={logs}
    />
  )
}
