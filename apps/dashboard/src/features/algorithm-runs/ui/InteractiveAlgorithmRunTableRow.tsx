import type { AlgorithmRun, AlgorithmRunStatus } from '@tradeb0t/core'
import AlgorithmRunTableRow from '@/src/entities/algorithm-run/ui/AlgorithmRunTableRow'
import { trpc } from '@/src/shared/api/trpc'
import { useAppDispatch } from '@/src/shared/model/hooks'
import { pushNotification } from '@/src/entities/notifications/model/notificationsSlice'

export interface InteractiveAlgorithmRunTableRowProps {
  botUrl: string
  algorithmRun: AlgorithmRun
  className?: string
}

const stoppableStatuses: AlgorithmRunStatus[] = ['running', 'resumed']
const resumableStatuses: AlgorithmRunStatus[] = ['stopped']

export default function InteractiveAlgorithmRunTableRow({
  algorithmRun,
  botUrl,
  className = ''
}: InteractiveAlgorithmRunTableRowProps) {
  const dispatchRedux = useAppDispatch()

  const dispatchStop = trpc.control.algorithms.stop.useMutation({
    onSuccess: (result) => {
      dispatchRedux(
        pushNotification({
          type: 'success',
          content: `Algorithm <code class="kbd kbd-sm text-white">${result.algorithmName}</code> run
          with id <code class="kbd kbd-sm text-white">${result.id}</code> was successfully stopped!`
        })
      )
    },
    onError: (error) => {
      dispatchRedux(
        pushNotification({
          type: 'error',
          content: `Algorithm <code class="kbd kbd-sm text-white">${algorithmRun.algorithmName}</code> run
          with id <code class="kbd kbd-sm text-white">${algorithmRun.id}</code> failed to stop 😔`
        })
      )
    }
  })
  const dispatchResume = trpc.control.algorithms.resume.useMutation({
    onSuccess: (result) => {
      dispatchRedux(
        pushNotification({
          type: 'success',
          content: `Algorithm <code class="kbd kbd-sm text-white">${result.algorithmName}</code> run
          with id <code class="kbd kbd-sm text-white">${result.id}</code> was successfully resumed!`
        })
      )
    },
    onError: (error) => {
      dispatchRedux(
        pushNotification({
          type: 'error',
          content: `Algorithm <code class="kbd kbd-sm text-white">${algorithmRun.algorithmName}</code> run
          with id <code class="kbd kbd-sm text-white">${algorithmRun.id}</code> failed to resume 😔`
        })
      )
    }
  })

  function handleStop() {
    dispatchStop.mutate({ url: botUrl, algorithmName: algorithmRun.algorithmName, runId: algorithmRun.id })
  }

  function handleResume() {
    dispatchResume.mutate({ url: botUrl, algorithmName: algorithmRun.algorithmName, runId: algorithmRun.id })
  }

  return (
    <AlgorithmRunTableRow
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
