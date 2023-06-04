import type { Algorithm } from '@tradeb0t/core'
import AlgorithmCardFrame from '@/src/entities/algorithm/ui/AlgorithmCardFrame'
import RunAlgorithmModal from '@/src/entities/algorithm/ui/RunAlgorithmModal'
import { trpc } from '@/src/shared/api/trpc'
import { useAppDispatch } from '@/src/shared/model/hooks'
import { pushNotification } from '@/src/entities/notifications/model/notificationsSlice'

export interface MultipleBotsAlgorithmCard {
  algorithm: Algorithm
  className?: string
}

export default function MultipleBotsAlgorithmCard({ algorithm, className }: MultipleBotsAlgorithmCard) {
  const dispatch = useAppDispatch()
  const runAlgorithmMutation = trpc.control.algorithms.runForAllBots.useMutation({
    onSuccess: (result) => {
      const successCount = result.filter((r) => r.status === 'fulfilled').length
      dispatch(
        pushNotification({
          type: 'success',
          content: `Algorithm <code class="kbd kbd-sm text-white">${algorithm.name}</code>
                    is running successfully at ${successCount} instances!`
        })
      )
    }
  })

  return (
    <>
      <AlgorithmCardFrame
        className={className}
        algorithm={algorithm}
        runAlgorithmComponent={
          <RunAlgorithmModal
            algorithm={algorithm}
            runAlgorithm={(inputs) =>
              runAlgorithmMutation.mutate({
                algorithmName: algorithm.name,
                inputs
              })
            }
          />
        }
      />
    </>
  )
}