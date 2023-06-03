import { useEffect, useState } from 'react'
import BotLogsCardWithoutConnection from '@/src/entities/logs/ui/BotLogsCard'
import type { LogObject } from '@/src/entities/logs/models/LogObject'
import { useSocket } from '@/src/shared/api/socket'

export interface BotLogsCardProps {
  botUrl: string
}

export default function BotLogsCard({ botUrl }: BotLogsCardProps) {
  const socket = useSocket('/api/logs/socket')
  const [logs, setLogs] = useState<LogObject[]>([])

  useEffect(() => {
    socket?.on(`log:${botUrl}`, (log: LogObject) => {
      setLogs((logs) => [...logs, log])
    })
  }, [socket])

  return <BotLogsCardWithoutConnection header={<>Logs</>} logs={logs} />
}
