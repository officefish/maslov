//import { MyProfile } from '@client/components/screens/profile'
import { NextPageWithLayout } from '@client/utilities/layout.types'
import Layout from '@client/components/layout/Layout'
import Providers, { BackendAddressProvider } from '@client/providers'
import WorkspacesList from '@client/components/screens/workspace/WorkspaceList'

const WorkspacesPage: NextPageWithLayout = () => {
  return <WorkspacesList />
}
export default WorkspacesPage

WorkspacesPage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Providers themeProps={WorkspacesPage.theme}>
      <BackendAddressProvider>
        <Layout title="Profile">{page}</Layout>
      </BackendAddressProvider>
    </Providers>
  )
}

WorkspacesPage.theme = {
  themes: ['daisy', 'cmyk'],
}
