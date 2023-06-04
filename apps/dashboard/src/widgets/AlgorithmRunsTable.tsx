import { useCallback, memo, useEffect } from 'react'
import LoadingLine from '../shared/ui/LoadingLine'
import AlgorithmRunsTableRow from '@/src/features/algorithm-runs/ui/AlgorithmRunsTableRow'
import Pagination, { PaginationProps } from '../shared/ui/Pagination'
import { trpc } from '@/src/shared/api/trpc'
import type { AlgorithmRun } from '@tradeb0t/core'
import { usePushNotification } from '@/src/shared/hooks'
import { failedQueryNotification } from '@/src/shared/notifications/failedQueryNotification'

const AlgorithmRunsTableRowMemo = memo(AlgorithmRunsTableRow)
const PaginationMemo = memo(Pagination)

export interface AlgorithmRunsTableProps {
  botUrl: string
  algorithmName: string
  page?: number
  pageLinkPattern: PaginationProps['pageLinkPattern']
}

export function AlgorithmRunsTable({ botUrl, algorithmName, page = 1, pageLinkPattern }: AlgorithmRunsTableProps) {
  const perPage = 10
  const pushNotification = usePushNotification()
  const {
    data: algorithmRuns,
    refetch,
    isLoading,
    isFetching,
    isError
  } = trpc.control.algorithms.listRuns.useQuery({
    url: botUrl,
    algorithmName: algorithmName,
    pagination: {
      page,
      perPage
    }
  })

  if (isError) {
    pushNotification(failedQueryNotification('trpc.control.algorithms.listRuns'))
  }

  // TODO: use socket to refetch
  useEffect(() => {
    const timer = setInterval(() => {
      refetch()
    }, 3000)
    return () => clearInterval(timer)
  }, [algorithmRuns])

  const onDataUpdate = useCallback(() => {
    refetch()
  }, [])

  return (
    <>
      <div className={`flex justify-center ${algorithmRuns?.pagination.totalPages ?? 1 === 1 ? 'hidden' : ''}`}>
        <PaginationMemo
          className="my-3 mx-auto"
          allPages={algorithmRuns?.pagination.totalPages ?? 1}
          currentPage={page}
          pageLinkPattern={pageLinkPattern}
        />
      </div>

      <LoadingLine className={`${isLoading || isFetching ? '' : 'opacity-0'}`} />

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

      <div className={`flex justify-center ${algorithmRuns?.pagination.totalPages ?? 1 === 1 ? 'hidden' : ''}`}>
        <PaginationMemo
          className="my-3 mx-auto"
          allPages={algorithmRuns?.pagination.totalPages ?? 1}
          currentPage={page}
          pageLinkPattern={pageLinkPattern}
        />
      </div>
    </>
  )
}
