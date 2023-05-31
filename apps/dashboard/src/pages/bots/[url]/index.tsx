import { trpc } from '@/src/shared/api/trpc'
import { useRouter } from 'next/router'
import AlgorithmsList from '@/src/widgets/algorithm/AlgorithmsList'
import BotHeaderDescriptor from '@/src/widgets/bot/BotHeaderDescriptor'

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
      <AlgorithmsList bot={bot} />
    </>
  )
}
