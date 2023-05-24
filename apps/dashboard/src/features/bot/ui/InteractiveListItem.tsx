import Link from 'next/link'
import ListItem from '@/src/entities/bot/ui/ListItem'
import type { BotDesciption } from '@/src/entities/bot/model/BotDesciption'

export interface InteractiveListItemProps {
  bot: BotDesciption
}

export default function InteractiveListItem({ bot }: InteractiveListItemProps) {
  return (
    <ListItem
      bot={bot}
      goToDetailsComponent={
        <Link href={`/bots/${bot.url}`} className="btn btn-primary">
          Details
        </Link>
      }
    />
  )
}
