import { useMemo } from 'react'
import Link from 'next/link'

export interface PaginationProps {
  currentPage: number
  allPages: number
  pageLinkPattern: (page: number) => string
  className?: string
}

export default function Pagination({ allPages, currentPage, pageLinkPattern, className = '' }: PaginationProps) {
  const visiblePages = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => i - 3 + currentPage).filter((num) => num >= 1 && num <= allPages)
  }, [currentPage, allPages])

  return (
    <nav className={`btn-group ${className}`}>
      {currentPage > 1 ? (
        <Link href={pageLinkPattern(currentPage - 1)} className="btn">
          «
        </Link>
      ) : null}
      {!visiblePages.includes(1) ? (
        <>
          <Link href={pageLinkPattern(1)} className="btn">
            1
          </Link>
          <div className="btn btn-disabled">...</div>
        </>
      ) : null}
      {visiblePages.map((page) => (
        <Link href={pageLinkPattern(page)} key={page} className={`btn ${page === currentPage ? 'btn-active' : ''}`}>
          {page}
        </Link>
      ))}
      {!visiblePages.includes(allPages) ? (
        <>
          <div className="btn btn-disabled">...</div>
          <Link href={pageLinkPattern(allPages)} className="btn">
            {allPages}
          </Link>
        </>
      ) : null}
      {currentPage < allPages ? (
        <Link href={pageLinkPattern(currentPage + 1)} className="btn">
          »
        </Link>
      ) : null}
    </nav>
  )
}
