import BotListItem from '@/src/features/bot/ui/BotListItem'
import { BotDesciption } from '@/src/entities/bot/model/BotDesciption'

export interface BotsListProps {
  bots: BotDesciption[]
}

export default function BotsList({ bots }: BotsListProps) {
  return (
    <ul>
      {bots?.map((bot) => (
        <BotListItem bot={bot} key={bot.url} />
      ))}
    </ul>
  )
}
