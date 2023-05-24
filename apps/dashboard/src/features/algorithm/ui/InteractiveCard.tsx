import { Algorithm } from '@tradeb0t/core'
import Link from 'next/link'
import Card from '@/src/entities/algorithm/ui/Card'
import { BotDesciption } from '@/src/entities/bot/model/BotDesciption'

export interface InteractiveCardProps {
  bot: BotDesciption
  algorithm: Algorithm
  className?: string
}

export default function InteractiveCard({ bot, algorithm, className }: InteractiveCardProps) {
  return (
    <Card
      className={className}
      algorithm={algorithm}
      goToRunsComponent={
        <Link href={`/bots/${bot.url}/algorithms/${algorithm.name}/runs`} className="btn btn-primary btn-sm">
          Runs
        </Link>
      }
      runAlgorithmComponent={<button className="btn btn-primary btn-sm">Run</button>}
    />
  )
}
