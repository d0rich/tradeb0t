import { BotDesciption } from '@/src/entities/bot/model/BotDesciption'
import { trpc } from '@/src/shared/api/trpc'
import AlgorithmCard from '@/src/features/algorithm/ui/AlgorithmCard'

export interface AlgorithmsListProps {
  bot: BotDesciption
}

export default function AlgorithmsList({ bot }: AlgorithmsListProps) {
  const { data: algorithms } = trpc.control.algorithms.list.useQuery({ url: bot.url })
  return (
    <>
      {algorithms?.map((algorithm) => (
        <AlgorithmCard key={algorithm.name} bot={bot} algorithm={algorithm} />
      ))}
    </>
  )
}
