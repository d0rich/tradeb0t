import Link from 'next/link'

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 p-2 bg-base-300 bg-opacity-70 backdrop-blur">
      <Link href="/" className="flex gap-3 text-xl font-bold items-center">
        <img src="/badlabs-icon.svg" className="h-12" /> tradeb0t dashboard
      </Link>
    </header>
  )
}
