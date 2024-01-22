import { MyProfile } from '@client/components/screens/profile'
import { NextPageWithLayout } from '@client/utilities/layout.types'
import Layout from '@client/components/layout/Layout'
import Providers, { BackendAddressProvider } from '@client/providers'

const ProfilePage: NextPageWithLayout = () => {
  return <MyProfile />
}
export default ProfilePage

ProfilePage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Providers themeProps={ProfilePage.theme}>
      <BackendAddressProvider>
        <Layout title="Profile">{page}</Layout>
      </BackendAddressProvider>
    </Providers>
  )
}

ProfilePage.theme = {
  themes: ['daisy', 'cmyk'],
}
