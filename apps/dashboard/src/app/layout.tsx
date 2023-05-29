import { memo } from 'react'

import './globals.css'
import Header from '../widgets/layout/Header'
import Navbar from '../widgets/layout/Navbar'
import Head from 'next/head'
import Notifications from '../widgets/layout/Notifications'

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
    </>
  )
}
