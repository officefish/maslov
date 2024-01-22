import ForgotPassword from '@client/components/screens/auth/forgot-password'
import { NextPageWithLayout } from '@client/utilities/layout.types'
import Layout from '@client/components/layout/Layout'
import Providers from '@client/providers'

const ForgotPasswordPage: NextPageWithLayout = () => {
  return <ForgotPassword />
}
export default ForgotPasswordPage

ForgotPasswordPage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Providers themeProps={ForgotPasswordPage.theme}>
      <Layout title="Request Password.">{page}</Layout>
    </Providers>
  )
}

ForgotPasswordPage.theme = {
  themes: ['daisy', 'cmyk'],
}
