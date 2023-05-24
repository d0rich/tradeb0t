import InteractiveListItem from '@/src/features/bot/ui/InteractiveListItem'
import { BotDesciption } from '@/src/entities/bot/model/BotDesciption'

export interface BotsListProps {
  bots: BotDesciption[]
}

export default function BotsList({ bots }: BotsListProps) {
  return (
    <ul>
      {bots?.map((bot) => (
        <InteractiveListItem bot={bot} key={bot.url} />
      ))}
    </ul>
  )
}
