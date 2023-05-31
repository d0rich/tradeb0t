import type { AppType } from 'next/app'
import { trpc } from '../shared/api/trpc'
import RootLayout from '../app/layout'
import { wrapper } from '../app/store'

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </>
  )
}

const MyAppWithRedux = wrapper.withRedux(MyApp)

export default trpc.withTRPC(MyAppWithRedux)
