import InteractiveAlgorithmRunTableRow from '@/src/features/algorithm-runs/ui/InteractiveAlgorithmRunTableRow'
import { trpc } from '@/src/shared/api/trpc'
import type { AlgorithmRun } from '@tradeb0t/core'

export interface AlgorithmRunsTableProps {
  botUrl: string
  algorithmName: string
}

export function AlgorithmRunsTable({ botUrl, algorithmName }: AlgorithmRunsTableProps) {
  const { data: algorithmRuns } = trpc.control.algorithms.listRuns.useQuery({
    url: botUrl,
    algorithmName: algorithmName
  }) as { data: AlgorithmRun[] }
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>Status</th>
            <th>State</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {algorithmRuns?.map((algorithmRun) => (
            <InteractiveAlgorithmRunTableRow key={algorithmRun.id} botUrl={botUrl} algorithmRun={algorithmRun} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
