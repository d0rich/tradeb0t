import { BotDesciption } from '@/src/entities/bot/model/BotDesciption'
import { trpc } from '@/src/shared/api/trpc'
import AlgorithmCard from '@/src/features/algorithm/ui/AlgorithmCard'
import LoadingCard from '@/src/shared/ui/LoadingCard'

export interface AlgorithmsListProps {
  bot: BotDesciption
}

export default function AlgorithmsList({ bot }: AlgorithmsListProps) {
  const { data: algorithms, isLoading } = trpc.control.algorithms.list.useQuery({ url: bot.url })
  return (
    <>
      {isLoading && <LoadingCard />}
      {algorithms?.map((algorithm) => (
        <AlgorithmCard key={algorithm.name} bot={bot} algorithm={algorithm} />
      ))}
    </>
  )
}
