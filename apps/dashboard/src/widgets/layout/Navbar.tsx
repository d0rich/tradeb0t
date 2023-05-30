import { useRouter } from 'next/router'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Breadcrumb {
  href: string
  label: string
}

export default function Navbar() {
  const router = useRouter()

  function getActiveButtons() {
    return {
      bots: router.pathname === '/bots',
      // FIXME: united logs is not a page
      unitedLogs: router.pathname === '/united-logs'
    }
  }

  function getBreadcrumbs(): Breadcrumb[] {
    return router.asPath.split('/').reduce(
      (acc, curr, index, all) => {
        if (index === 0) {
          return acc
        }
        const href = all.slice(0, index + 1).join('/')
        const label = curr
        acc.push({ href, label })
        return acc
      },
      [{ href: '/', label: 'Home' }]
    )
  }

  const [activeButtons, setActiveButtons] = useState(getActiveButtons())
  const [breadcrumbs, setBreadcrumbs] = useState(getBreadcrumbs())

  useEffect(() => {
    setActiveButtons(getActiveButtons())
    setBreadcrumbs(getBreadcrumbs())
  }, [router.pathname])

  return (
    <div className="w-4/5 mx-auto mt-20">
      <nav className="btn-group w-full">
        <Link className={`btn w-1/2 ${activeButtons.bots ? 'btn-active' : ''}`} href="/bots">
          Bots
        </Link>
        <button className={`btn w-1/2 ${activeButtons.unitedLogs ? 'btn-active' : ''}`}>United Logs</button>
      </nav>
      <nav className="text-sm breadcrumbs">
        <ul>
          {breadcrumbs.map((breadcrumb, index, allBreadcrumbs) => {
            let labelComponent =
              index === allBreadcrumbs.length - 1 ? (
                <span>{breadcrumb.label}</span>
              ) : (
                <Link className="text-accent" href={breadcrumb.href}>
                  {breadcrumb.label}
                </Link>
              )
            return <li key={index}>{labelComponent}</li>
          })}
        </ul>
      </nav>
    </div>
  )
}
