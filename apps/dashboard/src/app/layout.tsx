import './globals.css'
import { Inter } from 'next/font/google'
import Header from '../widgets/layout/header/Header'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div lang="en">
      <Head>
        <title>tradeb0t dashboard</title>
      </Head>
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
      </body>
    </div>
  )
}
