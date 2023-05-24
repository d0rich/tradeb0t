import { trpc } from '@/src/shared/api/trpc'
import { useRouter } from 'next/router'
import Avatar from '@/src/entities/bot/ui/Avatar'

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
      <div className="flex items-center flex-wrap">
        <Avatar bot={bot} />
        <h1 className="font-bold text-3xl m-5">{bot.name}</h1>
        <span className="badge badge-lg badge-primary">{bot.url}</span>
      </div>
    </>
  )
}
