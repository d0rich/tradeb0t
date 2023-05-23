import Link from 'next/link'

export default function Navbar() {
  return (
    <div className='w-4/5 mx-auto mt-20'>
      <nav className='btn-group w-full'>
        {/* TODO: dynamic active button */}
        <Link className="btn w-1/2" href="/bots">
          Bots
        </Link>
        <button className="btn w-1/2">United Logs</button>
      </nav>
      <nav className="text-sm text-accent breadcrumbs">
        {/* TODO: dynamic breadcrumbs */}
        <ul>
          <li><Link href='/'>Home</Link></li>
        </ul>
      </nav>
    </div>
  )
}
