import type { Algorithm } from '@tradeb0t/core'

import { trpc } from '@/src/shared/api/trpc'
import { useRouter } from 'next/router'
import Avatar from '@/src/entities/bot/ui/Avatar'
import InputsDescriptor from '@/src/entities/algorithm/ui/InputsDescriptor'
import { AlgorithmRunsTable } from '@/src/widgets/AlgorithmRunsTable'

export default function AlgorithmRunsPage() {
  const {
    query: { url: botUrl, algorithmName, page }
  } = useRouter()

  const { data: bot } = trpc.repository.findBot.useQuery({ url: String(botUrl) })
  const { data: algorithms } = trpc.control.algorithms.list.useQuery({ url: String(botUrl) }) as { data: Algorithm[] }

  function pageLinkPattern(page: number) {
    return `/bots/${botUrl}/algorithms/${algorithmName}/runs?page=${page}`
  }

  if (!bot) {
    return <h1 className="font-bold text-3xl m-5 text-error">Bot not found</h1>
  }

  const algorithm = algorithms.find((algorithm) => algorithm.name === algorithmName)

  return (
    <>
      <div className="flex items-center flex-wrap">
        <Avatar bot={bot} />
        <h1 className="font-bold text-3xl m-5">{bot.name}</h1>
        <span className="badge badge-lg badge-primary">{bot.url}</span>
      </div>
      <InputsDescriptor inputs={algorithm?.inputTypes ?? {}} />
      <AlgorithmRunsTable
        pageLinkPattern={pageLinkPattern}
        page={Number.isInteger(Number(page)) ? Number(page) : undefined}
        botUrl={String(botUrl)}
        algorithmName={String(algorithmName)}
      />
    </>
  )
}
