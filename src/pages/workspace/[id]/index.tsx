import { NextPageWithLayout } from '@client/utilities/layout.types'
import Layout from '@client/components/layout/Layout'
import Providers, { BackendAddressProvider } from '@client/providers'

const WorkspacePage: NextPageWithLayout = () => {
  return <h1>Hello</h1>
}
export default WorkspacePage

WorkspacePage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Providers themeProps={WorkspacePage.theme}>
      <BackendAddressProvider>
        <Layout title="Profile">{page}</Layout>
      </BackendAddressProvider>
    </Providers>
  )
}

WorkspacePage.theme = {
  themes: ['daisy', 'cmyk'],
}
