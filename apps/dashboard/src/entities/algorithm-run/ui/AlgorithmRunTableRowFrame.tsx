import { useState } from 'react'

import type { AlgorithmRun } from '@tradeb0t/core'
import AlgorithmRunStateView from './AlgorithmRunStateView'

export interface AlgorithmRunTableRowFrameProps {
  algorithmRun: AlgorithmRun
  actions: JSX.Element
  className?: string
}

export default function AlgorithmRunTableRowFrame({
  algorithmRun,
  className = '',
  actions
}: AlgorithmRunTableRowFrameProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <>
      <tr className={`${className}`}>
        <td>
          <button className="btn btn-circle text-2xl font-bold" onClick={() => setIsExpanded((current) => !current)}>
            {isExpanded ? '—' : '+'}
          </button>
        </td>
        <td>
          <code className="kbd">{algorithmRun.id}</code>
        </td>
        <td>
          <code className={`kbd uppercase ${getStatusClass(algorithmRun.status)}`}>{algorithmRun.status}</code>
        </td>
        <td>
          <div>
            Created: <code className="kbd kbd-sm">{algorithmRun.createdAt as unknown as string}</code>
          </div>
          <div>
            Updated: <code className="kbd kbd-sm">{algorithmRun.updatedAt as unknown as string}</code>
          </div>
        </td>
        <td>{actions}</td>
      </tr>
      {isExpanded ? (
        <tr className={`${className}`}>
          <td colSpan={3} className="max-w-0">
            <div>Inputs</div>
            <AlgorithmRunStateView state={algorithmRun.inputs} />
          </td>
          <td colSpan={2} className="max-w-0">
            <div>State</div>
            <AlgorithmRunStateView state={algorithmRun.state} />
          </td>
        </tr>
      ) : null}
    </>
  )
}

function getStatusClass(status: AlgorithmRun['status']) {
  switch (status) {
    case 'running':
      return 'text-green-500 border-green-500'
    case 'resumed':
      return 'text-green-500 border-green-500'
    case 'error':
      return 'text-red-500 border-red-500'
    case 'stopped':
      return 'text-yellow-500 border-yellow-500'
    default:
      return ''
  }
}
