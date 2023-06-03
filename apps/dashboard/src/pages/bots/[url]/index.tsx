import { trpc } from '@/src/shared/api/trpc'
import { useRouter } from 'next/router'
import AlgorithmsList from '@/src/widgets/algorithm/AlgorithmsList'
import BotHeaderDescriptor from '@/src/widgets/bot/BotHeaderDescriptor'
import BotLogsCard from '@/src/features/logs/ui/BotLogsCard'

export default function BotDetailsPage() {
  const {
    query: { url: botUrl }
  } = useRouter()
  const { data: bot } = trpc.repository.findBot.useQuery({ url: String(botUrl) })
  if (!bot) {
    return <h1 className="font-bold text-3xl m-5 text-error">Bot not found</h1>
  }
  return (
    <>
      <BotHeaderDescriptor bot={bot} />
      <BotLogsCard />
      <h2 className='text-3xl font-bold my-5'>Algorithms</h2>
      <AlgorithmsList bot={bot} />
    </>
  )
}
