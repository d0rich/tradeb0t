import BotListItem from '@/src/features/bot/ui/BotListItem'
import { BotDesciption } from '@/src/entities/bot/model/BotDesciption'
import LoadingCard from '@/src/shared/ui/LoadingCard'

export interface BotsListProps {
  bots: BotDesciption[]
  loading?: boolean
}

export default function BotsList({ bots, loading }: BotsListProps) {
  if (loading) {
    ;<ul>
      <LoadingCard />
    </ul>
  }

  return (
    <ul>
      {bots?.map((bot) => (
        <BotListItem bot={bot} key={bot.url} />
      ))}
    </ul>
  )
}
