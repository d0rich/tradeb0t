import Link from 'next/link'
import BotListItemFrame from '@/src/entities/bot/ui/BotListItemFrame'
import type { BotDesciption } from '@/src/entities/bot/model/BotDesciption'

export interface BotListItemProps {
  bot: BotDesciption
}

export default function BotListItem({ bot }: BotListItemProps) {
  return (
    <BotListItemFrame
      bot={bot}
      goToDetailsComponent={
        <Link href={`/bots/${bot.url}`} className="btn btn-primary">
          Details
        </Link>
      }
    />
  )
}
