import type { LogObject } from '../models/LogObject'

export default function TypeView({ type }: { type: LogObject['type'] }) {
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
