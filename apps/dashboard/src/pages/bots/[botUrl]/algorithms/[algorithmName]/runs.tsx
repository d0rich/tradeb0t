import type { Algorithm } from '@tradeb0t/core'

import { trpc } from '@/src/shared/api/trpc'
import { useRouter } from 'next/router'
import { AlgorithmRunsTable } from '@/src/widgets/AlgorithmRunsTable'
import BotHeaderDescriptor from '@/src/widgets/bot/BotHeaderDescriptor'
import AlgorithmHeaderDescriptor from '@/src/widgets/algorithm/AlgorithmHeaderDescriptor'

export default function AlgorithmRunsPage() {
  const {
    query: { botUrl, algorithmName, page }
  } = useRouter()

  const { data: bot } = trpc.repository.findBot.useQuery({ url: String(botUrl) })
  // FIXME: Provide serialized type for Algorithm
  const { data: algorithms } = trpc.control.algorithms.list.useQuery({ url: String(botUrl) }) as {
    data: Algorithm[] | undefined
  }

  const algorithm = algorithms?.find((algorithm) => algorithm.name === algorithmName)

  if (!bot || !algorithm) {
    return <h1 className="font-bold text-3xl m-5 text-error">Bot not found</h1>
  }

  function pageLinkPattern(page: number) {
    return `/bots/${botUrl}/algorithms/${algorithmName}/runs?page=${page}`
  }

  return (
    <>
      <BotHeaderDescriptor bot={bot} />
      <AlgorithmHeaderDescriptor algorithm={algorithm} />
      <AlgorithmRunsTable
        pageLinkPattern={pageLinkPattern}
        page={Number.isInteger(Number(page)) ? Number(page) : undefined}
        botUrl={String(botUrl)}
        algorithmName={String(algorithmName)}
      />
    </>
  )
}
