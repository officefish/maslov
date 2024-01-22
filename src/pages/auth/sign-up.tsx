import SignUp from '@client/components/screens/auth/sign-up'
import { NextPageWithLayout } from '@client/utilities/layout.types'
import Layout from '@client/components/layout/Layout'
import Providers from '@client/providers'

const SignUpPage: NextPageWithLayout = () => {
  return <SignUp />
}
export default SignUpPage

SignUpPage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Providers themeProps={SignUpPage.theme}>
      <Layout title="Sign Up.">{page}</Layout>
    </Providers>
  )
}

SignUpPage.theme = {
  themes: ['daisy', 'cmyk'],
}
