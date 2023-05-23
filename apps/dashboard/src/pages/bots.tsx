import { trpc } from '../app/trpc'

export default function BotsPage() {
  const bots = trpc.control.getBots.useQuery()

  return (
    <>
      <h1>Bots</h1>
      <ul>
        {bots.data?.bots?.map((bot) => (
          <li key={bot.url}>{bot.name}</li>
        ))}
      </ul>
    </>
  )
}
