import { memo } from 'react'
import Head from 'next/head'

import './globals.css'

import Header from '@/src/widgets/layout/Header'
import Navbar from '@/src/widgets/layout/Navbar'
import Notifications from '@/src/widgets/layout/Notifications'
import UnitedLogsModal from '@/src/features/logs/ui/UnitedLogsModal'

const HeaderMemo = memo(Header)
const NavbarMemo = memo(Navbar)
const NotificationsMemo = memo(Notifications)

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>tradeb0t dashboard</title>
      </Head>
      <HeaderMemo />
      <NavbarMemo />
      <main className="max-w-screen-xl mx-auto px-3">{children}</main>
      <NotificationsMemo />
      <UnitedLogsModal />
    </>
  )
}
