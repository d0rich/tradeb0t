import { useRef } from 'react'
import type { LogObject } from 'consola'
import 'highlight.js/styles/atom-one-dark.css'
import hljs from 'highlight.js'

export interface LogsOutputProps {
  logs: LogObject[]
}

export default function LogsOutput({ logs }: LogsOutputProps) {
  return (
    <div className="">
      <div className="overflow-auto h-full mockup-code">
        {logs.map((log, index) => {
          return (
            <pre key={index} data-prefix=">" className="text-lg font-bold">
              <TagView tag={log.tag} /> <TypeView type={log.type} /> {log.message} <ArgsView args={log.args} />
            </pre>
          )
        })}
      </div>
    </div>
  )
}

interface ArgsViewProps {
  args: unknown[]
}

function TagView({ tag }: { tag: string }) {
  return <span className="text-gray-500">{tag}:</span>
}

function TypeView({ type }: { type: LogObject['type'] }) {
  const colors: Record<LogObject['type'], string> = {
    success: 'text-green-500',
    fail: 'text-red-500',
    warn: 'text-yellow-500',
    info: 'text-blue-500',
    debug: 'text-gray-500',
    silent: 'text-gray-500',
    fatal: 'text-red-500',
    error: 'text-red-500',
    ready: 'text-green-500',
    log: 'text-gray-500',
    start: 'text-green-500',
    trace: 'text-gray-500',
    verbose: 'text-gray-500'
  }
  return <span className={`${colors[type]} uppercase`}>[{type}]</span>
}

function ArgsView({ args }: ArgsViewProps) {
  return (
    <>
      {args.map((arg, index) => {
        if (typeof arg === 'object') {
          return <ArgJSON key={index} arg={arg!} />
        }
        if (typeof arg === 'string' || typeof arg === 'number') {
          return <code key={index}>{arg}</code>
        }
      })}
    </>
  )
}

function ArgJSON({ arg }: { arg: object }) {
  const ref = useRef<HTMLElement>(null)
  const html = hljs.highlight(JSON.stringify(arg), {
    language: 'json'
  })

  return <code ref={ref} dangerouslySetInnerHTML={{ __html: html.value }} />
}
