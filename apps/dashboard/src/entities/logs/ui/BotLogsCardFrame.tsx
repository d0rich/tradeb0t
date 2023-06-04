import type { LogObject } from '../models/LogObject'
import LogsOutput from './LogsOutput'

export interface BotLogsCardFrameProps {
  logs: LogObject[]
  header: JSX.Element
  className?: string
}

export default function BotLogsCardFrame({ logs, header, className = '' }: BotLogsCardFrameProps) {
  return (
    <div className={`card card-compact bg-base-200 max-h-[70vh] ${className}`}>
      <div className="card-body">
        <h2 className="card-title">{header}</h2>
        <LogsOutput hideTags className="overflow-y-auto max-h-[60vh]" logs={logs} />
      </div>
    </div>
  )
}
