import type { LogObject } from 'consola'
import LogsOutput from '@/src/entities/logs/ui/LogsOutput'

const modalId = `united-logs-modal-checkbox`

export interface UnitedBoxModalButtonProps {
  className?: string
  children?: React.ReactNode
}

export function UnitedBoxModalButton({ className = '', children }: UnitedBoxModalButtonProps) {
  return (
    <label htmlFor={modalId} className={`btn ${className}`}>
      {children}
    </label>
  )
}

export interface UnitedLogsModalProps {
  logs: LogObject[]
}

export default function UnitedLogsModal({ logs }: UnitedLogsModalProps) {
  return (
    <>
      <input type="checkbox" id={modalId} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box bg-base-200 relative !max-w-screen-xl w-[90vw]">
          <div className="flex justify-between m-3">
            <h2 className="text-xl font-bold">United Logs</h2>
            <label htmlFor={modalId} className="btn btn-sm !btn-circle">
              ✕
            </label>
          </div>
          <LogsOutput className="max-h-[70vh] overflow-y-auto" logs={logs} />
        </div>
      </div>
    </>
  )
}
