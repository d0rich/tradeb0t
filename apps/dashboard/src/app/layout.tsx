import './globals.css'
import Header from '../widgets/layout/header/Header'
import Head from 'next/head'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>tradeb0t dashboard</title>
      </Head>
      <Header />
      <main>{children}</main>
    </>
  )
}
