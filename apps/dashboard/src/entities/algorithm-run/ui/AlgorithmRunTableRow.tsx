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
      <td>{algorithmRun.id}</td>
      <td>{algorithmRun.status}</td>
      <td>
        <AlgorithmRunStateView state={algorithmRun.state} />
      </td>
      <td>{algorithmRun.createdAt as unknown as string}</td>
      <td>{algorithmRun.updatedAt as unknown as string}</td>
      <td>{actions}</td>
    </tr>
  )
}
