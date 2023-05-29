import type { AlgorithmRun } from '@tradeb0t/core'
import AlgorithmRunStateView from './AlgorithmRunStateView'

export interface AlgorithmRunTableRowProps {
  algorithmRun: AlgorithmRun
  actions: JSX.Element
  className?: string
}

export default function AlgorithmRunTableRow({ algorithmRun, className = '', actions }: AlgorithmRunTableRowProps) {
  return (
    <tr className={`${className}`}>
      <td>
        <code className="kbd">{algorithmRun.id}</code>
      </td>
      <td>
        <code className={`kbd uppercase ${getStatusClass(algorithmRun.status)}`}>{algorithmRun.status}</code>
      </td>
      <td>
        <AlgorithmRunStateView state={algorithmRun.state} />
      </td>
      <td>
        <div>
          Created: <code className="kbd kbd-sm">{algorithmRun.createdAt as unknown as string}</code>
        </div>
        <div>
          Updated: <code className="kbd kbd-sm">{algorithmRun.createdAt as unknown as string}</code>
        </div>
      </td>
      <td>{actions}</td>
    </tr>
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
