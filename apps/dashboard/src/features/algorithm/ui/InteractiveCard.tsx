import type { Algorithm } from '@tradeb0t/core'
import Link from 'next/link'
import Card from '@/src/entities/algorithm/ui/Card'
import RunAlgorithmModal from '@/src/entities/algorithm/ui/RunAlgorithmModal'
import { BotDesciption } from '@/src/entities/bot/model/BotDesciption'
import { trpc } from '@/src/shared/api/trpc'

export interface InteractiveCardProps {
  bot: BotDesciption
  algorithm: Algorithm
  className?: string
}

export default function InteractiveCard({ bot, algorithm, className }: InteractiveCardProps) {
  const runAlgorithmMutation = trpc.control.algorithms.run.useMutation({
    onSuccess: (result) => {
      console.log(result)
    }
  })

  return (
    <>
      <Card
        className={className}
        algorithm={algorithm}
        goToRunsComponent={
          <Link href={`/bots/${bot.url}/algorithms/${algorithm.name}/runs`} className="btn btn-primary btn-sm">
            Runs
          </Link>
        }
        runAlgorithmComponent={
          <RunAlgorithmModal
            algorithm={algorithm}
            runAlgorithm={(inputs) =>
              runAlgorithmMutation.mutate({
                url: bot.url,
                algorithmName: algorithm.name,
                inputs
              })
            }
          />
        }
      />
    </>
  )
}
