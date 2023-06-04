import type { AlgorithmRun, AlgorithmRunStatus } from '@tradeb0t/core'
import AlgorithmRunTableRowFrame from '@/src/entities/algorithm-run/ui/AlgorithmRunTableRowFrame'
import { trpc } from '@/src/shared/api/trpc'
import { usePushNotification } from '@/src/shared/hooks'

export interface AlgorithmRunsTableRowProps {
  botUrl: string
  algorithmRun: AlgorithmRun
  className?: string
  onUpdate?: () => void
}

const stoppableStatuses: AlgorithmRunStatus[] = ['running', 'resumed']
const resumableStatuses: AlgorithmRunStatus[] = ['stopped']

export default function AlgorithmRunsTableRow({
  algorithmRun,
  botUrl,
  className = '',
  onUpdate
}: AlgorithmRunsTableRowProps) {
  const pushNotification = usePushNotification()

  const dispatchStop = trpc.control.algorithms.stop.useMutation({
    onSuccess: (result) => {
      pushNotification({
        type: 'success',
        content: `Algorithm <code class="kbd kbd-sm text-white">${result.algorithmName}</code> run
        with id <code class="kbd kbd-sm text-white">${result.id}</code> was successfully stopped!`
      })
    },
    onError: (error) => {
      pushNotification({
        type: 'error',
        content: `Algorithm <code class="kbd kbd-sm text-white">${algorithmRun.algorithmName}</code> run
        with id <code class="kbd kbd-sm text-white">${algorithmRun.id}</code> failed to stop 😔`
      })
    },
    onSettled: () => {
      if (onUpdate) onUpdate()
    }
  })
  const dispatchResume = trpc.control.algorithms.resume.useMutation({
    onSuccess: (result) => {
      pushNotification({
        type: 'success',
        content: `Algorithm <code class="kbd kbd-sm text-white">${result.algorithmName}</code> run
        with id <code class="kbd kbd-sm text-white">${result.id}</code> was successfully resumed!`
      })
    },
    onError: (error) => {
      pushNotification({
        type: 'error',
        content: `Algorithm <code class="kbd kbd-sm text-white">${algorithmRun.algorithmName}</code> run
        with id <code class="kbd kbd-sm text-white">${algorithmRun.id}</code> failed to resume 😔`
      })
    },
    onSettled: () => {
      if (onUpdate) onUpdate()
    }
  })

  function handleStop() {
    dispatchStop.mutate({ url: botUrl, algorithmName: algorithmRun.algorithmName, runId: algorithmRun.id })
  }

  function handleResume() {
    dispatchResume.mutate({ url: botUrl, algorithmName: algorithmRun.algorithmName, runId: algorithmRun.id })
  }

  return (
    <AlgorithmRunTableRowFrame
      className={className}
      algorithmRun={algorithmRun}
      actions={
        <>
          {stoppableStatuses.includes(algorithmRun.status) ? (
            <button className="btn btn-sm btn-error" onClick={() => handleStop()}>
              Stop
            </button>
          ) : null}
          {resumableStatuses.includes(algorithmRun.status) ? (
            <button className="btn btn-sm btn-success" onClick={() => handleResume()}>
              Resume
            </button>
          ) : null}
        </>
      }
    />
  )
}
