import { MyProfile } from '@client/components/screens/profile'
import { NextPageWithLayout } from '@client/utilities/layout.types'
import Layout from '@client/components/layout/Layout'
import Providers from '@client/providers'

const ProfilePage: NextPageWithLayout = () => {
  return <MyProfile />
}
export default ProfilePage

ProfilePage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Providers themeProps={ProfilePage.theme}>
      <Layout title="Profile">{page}</Layout>
    </Providers>
  )
}

ProfilePage.theme = {
  themes: ['daisy', 'cmyk'],
}
