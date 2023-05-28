import { BotDesciption } from '../model/BotDesciption'
import seedrandom from 'seedrandom'

export interface AvatarProps {
  bot: BotDesciption
}

const bgColors = [
  'bg-red-800',
  'bg-green-800',
  'bg-blue-800',
  'bg-yellow-800',
  'bg-indigo-800',
  'bg-purple-800',
  'bg-pink-800'
]

export default function Avatar({ bot }: AvatarProps) {
  const initials = bot.name
    .split(' ')
    .splice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase()
  const bgColor = bgColors[Math.floor(seedrandom(bot.url).quick() * bgColors.length)]
  return (
    <figure className="avatar placeholder">
      <div className={`w-12 rounded-full ${bgColor}`}>
        <span>{initials}</span>
      </div>
    </figure>
  )
}
