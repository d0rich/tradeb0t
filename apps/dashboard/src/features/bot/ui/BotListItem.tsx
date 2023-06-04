import Link from 'next/link'
import ListItem from '@/src/entities/bot/ui/ListItem'
import type { BotDesciption } from '@/src/entities/bot/model/BotDesciption'

export interface BotListItemProps {
  bot: BotDesciption
}

export default function BotListItem({ bot }: BotListItemProps) {
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
