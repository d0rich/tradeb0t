import BotsList from '@/src/widgets/bot/BotsList'
import { trpc } from '../../shared/api/trpc'

export default function BotsPage() {
  const { data: bots, isLoading } = trpc.repository.getBots.useQuery()

  return (
    <>
      <h1 className="font-bold text-3xl m-5">Bots</h1>
      <BotsList loading={isLoading} bots={bots ?? []} />
    </>
  )
}
