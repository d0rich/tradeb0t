import { trpc } from '@/src/shared/api/trpc'
import { useRouter } from 'next/router'
import { AlgorithmRunsTable } from '@/src/widgets/AlgorithmRunsTable'
import BotHeaderDescriptor from '@/src/widgets/bot/BotHeaderDescriptor'
import AlgorithmHeaderDescriptor from '@/src/widgets/algorithm/AlgorithmHeaderDescriptor'
import Loading from '@/src/shared/ui/Loading'

export default function AlgorithmRunsPage() {
  const {
    query: { botUrl, algorithmName, page }
  } = useRouter()

  const {
    data: bot,
    isLoading: isLoadingBot,
    isError: isErrorBot
  } = trpc.repository.findBot.useQuery({ url: String(botUrl) })
  const {
    data: algorithms,
    isLoading: isLoadingAlgorithm,
    isError: isErrorAlgorithm
  } = trpc.control.algorithms.list.useQuery({ url: String(botUrl) })

  const algorithm = algorithms?.find((algorithm) => algorithm.name === algorithmName)

  if (isErrorAlgorithm || isErrorBot) {
    return <h1 className="font-bold text-3xl m-5 text-error">Bot not found</h1>
  }

  if (isLoadingAlgorithm || isLoadingBot) {
    return (
      <div className="w-full h-[66vh] flex items-center justify-center">
        <Loading />
      </div>
    )
  }

  function pageLinkPattern(page: number) {
    return `/bots/${botUrl}/algorithms/${algorithmName}/runs?page=${page}`
  }

  return (
    <>
      <BotHeaderDescriptor bot={bot!} />
      <AlgorithmHeaderDescriptor botUrl={botUrl as string} algorithm={algorithm!} />
      <h2 className="text-3xl font-bold my-7">Algorithm runs</h2>
      <AlgorithmRunsTable
        pageLinkPattern={pageLinkPattern}
        page={Number.isInteger(Number(page)) ? Number(page) : undefined}
        botUrl={String(botUrl)}
        algorithmName={String(algorithmName)}
      />
    </>
  )
}
