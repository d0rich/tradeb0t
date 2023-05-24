import Link from 'next/link'
import { trpc } from '../shared/api/trpc'

export default function BotsPage() {
  const bots = trpc.control.getBots.useQuery()

  return (
    <>
      <h1 className="font-bold text-3xl m-5">Bots</h1>
      <ul>
        {bots.data?.bots?.map((bot) => (
          <li className="card card-side bg-base-300 shadow-xl" key={bot.url}>
            <div className="card-body flex-row items-center gap-x-4 flex-wrap">
              <h2 className="card-title">{bot.name}</h2>
              <span className="badge badge-primary">{bot.url}</span>
            </div>
            <div className="card-actions items-center px-5">
              <Link href={'#'} className="btn btn-primary">
                Details
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}
