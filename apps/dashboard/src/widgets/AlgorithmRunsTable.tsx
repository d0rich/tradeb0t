import { useCallback, memo } from 'react'

import AlgorithmRunsTableRow from '@/src/features/algorithm-runs/ui/AlgorithmRunsTableRow'
import Pagination, { PaginationProps } from '../shared/ui/Pagination'
import { trpc } from '@/src/shared/api/trpc'
import type { AlgorithmRun } from '@tradeb0t/core'

const AlgorithmRunsTableRowMemo = memo(AlgorithmRunsTableRow)

export interface AlgorithmRunsTableProps {
  botUrl: string
  algorithmName: string
  page?: number
  pageLinkPattern: PaginationProps['pageLinkPattern']
}

export function AlgorithmRunsTable({ botUrl, algorithmName, page = 1, pageLinkPattern }: AlgorithmRunsTableProps) {
  const perPage = 10
  const { data: algorithmRuns, refetch } = trpc.control.algorithms.listRuns.useQuery({
    url: botUrl,
    algorithmName: algorithmName,
    pagination: {
      page,
      perPage
    }
  })

  const onDataUpdate = useCallback(() => {
    refetch()
  }, [])

  return (
    <>
      <div className="flex justify-center">
        <Pagination
          className="my-3 mx-auto"
          allPages={algorithmRuns?.pagination.totalPages ?? 1}
          currentPage={page}
          pageLinkPattern={pageLinkPattern}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>ID</th>
              <th>Status</th>
              <th>Timestamps</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {algorithmRuns?.items.map((algorithmRun) => (
              <AlgorithmRunsTableRowMemo
                key={algorithmRun.id}
                onUpdate={onDataUpdate}
                className="hover"
                botUrl={botUrl}
                algorithmRun={algorithmRun as unknown as AlgorithmRun}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center">
        <Pagination
          className="my-3 mx-auto"
          allPages={algorithmRuns?.pagination.totalPages ?? 1}
          currentPage={page}
          pageLinkPattern={pageLinkPattern}
        />
      </div>
    </>
  )
}
