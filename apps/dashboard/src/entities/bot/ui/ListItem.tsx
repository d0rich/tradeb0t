import type { BotDesciption } from '../model/BotDesciption'
import Avatar from './Avatar'

export interface ListItemProps {
  bot: BotDesciption
  goToDetailsComponent: React.ReactNode
}

export default function ListItem({ bot, goToDetailsComponent }: ListItemProps) {
  return (
    <li className="card card-side bg-base-300 shadow-xl">
      <div className="flex items-center p-3">
        <Avatar bot={bot} />
      </div>
      <div className="card-body flex-row items-center gap-x-4 flex-wrap p-3">
        <h2 className="card-title">{bot.name}</h2>
        <span className="badge badge-primary">{bot.url}</span>
      </div>
      <div className="card-actions items-center px-5">{goToDetailsComponent}</div>
    </li>
  )
}
