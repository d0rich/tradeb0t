import Link from 'next/link'

export default function Header() {
  return (
    <>
      <header className="flex items-center justify-between px-4 py-3 bg-neutral-700 border-b sm:px-6">
        <Link className="btn" href="/bots">
          Bots
        </Link>
        <button className="btn">United Logs</button>
      </header>
    </>
  )
}
