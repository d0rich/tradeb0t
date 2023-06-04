import { trpc } from '@/src/shared/api/trpc'
import { useRouter } from 'next/router'
import BotHeaderDescriptor from '@/src/widgets/bot/BotHeaderDescriptor'
import AlgorithmsList from '@/src/widgets/algorithm/AlgorithmsList'

export default function AlgorithmRunsPage() {
  const {
    query: { botUrl }
  } = useRouter()

  const { data: bot } = trpc.repository.findBot.useQuery({ url: String(botUrl) })

  if (!bot) {
    return <h1 className="font-bold text-3xl m-5 text-error">Bot not found</h1>
  }

  return (
    <>
      <BotHeaderDescriptor bot={bot} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
        <AlgorithmsList bot={bot} />
      </div>
    </>
  )
}
