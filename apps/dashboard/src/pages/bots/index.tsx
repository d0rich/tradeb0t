import BotsList from '@/src/widgets/bot/BotsList'
import { trpc } from '../../shared/api/trpc'
import { usePushNotification } from '@/src/shared/hooks'
import { failedQueryNotification } from '@/src/shared/notifications/failedQueryNotification'

export default function BotsPage() {
  const pushNotification = usePushNotification()
  const { data: bots, isLoading, error } = trpc.repository.getBots.useQuery()

  if (error) pushNotification(failedQueryNotification('trpc.repository.getBots'))

  return (
    <>
      <h1 className="font-bold text-3xl m-5">Bots</h1>
      <BotsList loading={isLoading} bots={bots ?? []} />
    </>
  )
}
