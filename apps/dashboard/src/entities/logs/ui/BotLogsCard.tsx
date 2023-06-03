import type { LogObject } from '../models/LogObject'
import LogsOutput from './LogsOutput'

export interface CardProps {
  logs: LogObject[]
  header: JSX.Element
  className?: string
}

export default function BotLogsCard({ logs, header, className = '' }: CardProps) {
  return (
    <div className={`card card-compact bg-base-200 ${className}`}>
      <div className="card-body">
        <h2 className="card-title">{header}</h2>
        <LogsOutput hideTags className="overflow-y-auto max-h-[70vw]" logs={logs} />
      </div>
    </div>
  )
}
