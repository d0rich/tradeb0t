import { trpc } from '@/src/shared/api/trpc'
import MultipleBotsAlgorithmCard from '@/src/features/algorithm/ui/MultipleBotsAlgorithmCard'
import LoadingCard from '@/src/shared/ui/LoadingCard'
import { usePushNotification } from '@/src/shared/hooks'
import { failedQueryNotification } from '@/src/shared/notifications/failedQueryNotification'

export interface UnitedAlgorithmsListProps {}

export default function UnitedAlgorithmsList({}: UnitedAlgorithmsListProps) {
  const { data: algorithms, isLoading, isError } = trpc.control.algorithms.listForAllBots.useQuery()
  const pushNotification = usePushNotification()
  if (isError) pushNotification(failedQueryNotification('trpc.control.algorithms.listForAllBots'))
  return (
    <>
      {isLoading && <LoadingCard />}
      {algorithms?.map((algorithm) => (
        <MultipleBotsAlgorithmCard key={algorithm.name} algorithm={algorithm} />
      ))}
    </>
  )
}
