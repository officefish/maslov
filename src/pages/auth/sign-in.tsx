import SignIn from '@client/components/screens/auth/sign-in'
import { NextPageWithLayout } from '@client/utilities/layout.types'
import Layout from '@client/components/layout/Layout'
import Providers, { BackendAddressProvider } from '@client/providers'

const SignInPage: NextPageWithLayout = () => {
  return <SignIn />
}
export default SignInPage

SignInPage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Providers themeProps={SignInPage.theme}>
      <BackendAddressProvider>
        <Layout title="Sign In.">{page}</Layout>
      </BackendAddressProvider>
    </Providers>
  )
}

SignInPage.theme = {
  themes: ['daisy', 'cmyk'],
}
