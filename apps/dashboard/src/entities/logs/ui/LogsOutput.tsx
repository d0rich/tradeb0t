import type { LogObject } from '../models/LogObject'
import ArgsView from './ArgsView'
import TagView from './TagView'
import TypeView from './TypeView'
import DateView from './DateView'

export interface LogsOutputProps {
  logs: LogObject[]
  className?: string
  hideTags?: boolean
}

export default function LogsOutput({ logs, className = '', hideTags }: LogsOutputProps) {
  return (
    <div className={`mockup-code ${className}`}>
      {logs.map((log, index) => {
        return (
          <pre key={index} data-prefix=">" className="text-sm font-bold whitespace-normal break-all">
            {hideTags ? null : <TagView tag={log.tag} />} <DateView date={log.date} /> <TypeView type={log.type} />{' '}
            {log.message} <ArgsView args={log.args} />
          </pre>
        )
      })}
    </div>
  )
}
