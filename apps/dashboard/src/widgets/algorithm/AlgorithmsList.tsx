import { BotDesciption } from '@/src/entities/bot/model/BotDesciption'
import { trpc } from '@/src/shared/api/trpc'
import AlgorithmCard from '@/src/features/algorithm/ui/AlgorithmCard'
import LoadingCard from '@/src/shared/ui/LoadingCard'
import { usePushNotification } from '@/src/shared/hooks'
import { failedQueryNotification } from '@/src/shared/notifications/failedQueryNotification'

export interface AlgorithmsListProps {
  bot: BotDesciption
}

export default function AlgorithmsList({ bot }: AlgorithmsListProps) {
  const pushNotification = usePushNotification()
  const { data: algorithms, isLoading, isError } = trpc.control.algorithms.list.useQuery({ url: bot.url })
  if (isError) pushNotification(failedQueryNotification('trpc.control.algorithms.list'))
  return (
    <>
      {isLoading && <LoadingCard />}
      {algorithms?.map((algorithm) => (
        <AlgorithmCard key={algorithm.name} bot={bot} algorithm={algorithm} />
      ))}
    </>
  )
}
