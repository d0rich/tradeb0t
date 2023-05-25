import type { AppType } from 'next/app'
import { trpc } from '../shared/api/trpc'
import RootLayout from '../app/layout'

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </>
  )
}
export default trpc.withTRPC(MyApp)