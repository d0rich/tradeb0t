import { trpc } from '@/src/shared/api/trpc'
import { useRouter } from 'next/router'
import AlgorithmsList from '@/src/widgets/algorithm/AlgorithmsList'
import BotHeaderDescriptor from '@/src/widgets/bot/BotHeaderDescriptor'
import BotLogsCard from '@/src/features/logs/ui/BotLogsCard'
import BotPortfolioCard from '@/src/features/portfolio/ui/BotPortfolioCard'
import Loading from '@/src/shared/ui/Loading'

export default function BotDetailsPage() {
  const {
    query: { botUrl }
  } = useRouter()
  const { data: bot, isError, isLoading } = trpc.repository.findBot.useQuery({ url: String(botUrl) })

  if (isError) {
    return <h1 className="font-bold text-3xl m-5 text-error">Bot not found</h1>
  }

  if (isLoading) {
    return (
      <div className="w-full h-[66vh] flex items-center justify-center">
        <Loading />
      </div>
    )
  }

  return (
    <>
      <BotHeaderDescriptor bot={bot!} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-3 items-start">
        <BotPortfolioCard botUrl={botUrl as string} />
        <BotLogsCard botUrl={botUrl as string} />
      </div>
      <h2 className="text-3xl font-bold my-5">Algorithms</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
        <AlgorithmsList bot={bot!} />
      </div>
    </>
  )
}
