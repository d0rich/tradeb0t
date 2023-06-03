import { BotDesciption } from '@/src/entities/bot/model/BotDesciption'
import { trpc } from '@/src/shared/api/trpc'
import InteractiveCard from '@/src/features/algorithm/ui/InteractiveCard'
import type { Algorithm } from '@tradeb0t/core'

export interface AlgorithmsListProps {
  bot: BotDesciption
}

export default function AlgorithmsList({ bot }: AlgorithmsListProps) {
  // FIXME: This is a workaround for Algorithm type not correctly transformed by trpc
  const { data: algorithms } = trpc.control.algorithms.list.useQuery({ url: bot.url }) as { data: Algorithm[] }
  return (
    <>
      {algorithms?.map((algorithm) => (
        <InteractiveCard key={algorithm.name} bot={bot} algorithm={algorithm} />
      ))}
    </>
  )
}
