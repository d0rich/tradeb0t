import './globals.css'
import Header from '../widgets/layout/Header'
import Navbar from '../widgets/layout/Navbar'
import Head from 'next/head'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>tradeb0t dashboard</title>
      </Head>
      <Header />
      <Navbar />
      <main className="max-w-screen-xl mx-auto px-3">{children}</main>
    </>
  )
}
