import type { LogObject } from '../models/LogObject'
import ArgsView from './ArgsView'
import TagView from './TagView'
import TypeView from './TypeView'

export interface LogsOutputProps {
  logs: LogObject[]
}

export default function LogsOutput({ logs }: LogsOutputProps) {
  return (
    <div className="mockup-code max-h-[70vh] overflow-y-auto">
      {logs.map((log, index) => {
        return (
          <pre key={index} data-prefix=">" className="text-lg font-bold whitespace-normal break-all">
            <TagView tag={log.tag} /> <TypeView type={log.type} /> {log.message} <ArgsView args={log.args} />
          </pre>
        )
      })}
    </div>
  )
}
