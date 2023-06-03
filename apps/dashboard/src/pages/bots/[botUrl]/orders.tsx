import { trpc } from '@/src/shared/api/trpc'
import { useRouter } from 'next/router'
import BotHeaderDescriptor from '@/src/widgets/bot/BotHeaderDescriptor'
import OrdersTable from '@/src/widgets/OrdersTable'
import OrdersFilter from '@/src/features/order/ui/OrdersFilter'

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
      <OrdersFilter
        onChange={(v) => {
          console.log(v)
        }}
      />
      <OrdersTable botUrl={String(botUrl)} />
    </>
  )
}
