import Avatar from '@/src/entities/bot/ui/Avatar'
import { BotDesciption } from '@/src/entities/bot/model/BotDesciption'

export interface BotHeaderDescriptorProps {
  bot: BotDesciption
}

export default function BotHeaderDescriptor({ bot }: BotHeaderDescriptorProps) {
  return (
    <div className="flex items-center flex-wrap">
      <Avatar bot={bot} />
      <h1 className="font-bold text-3xl m-5">{bot.name}</h1>
      <span className="badge badge-lg badge-primary">{bot.url}</span>
    </div>
  )
}
