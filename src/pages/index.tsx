import { NextPageWithLayout } from '@client/utilities/layout.types'
import Layout from '@client/components/layout/Layout'
import Home from '@client/components/screens/home'

import Providers, {
  BackendAddressProvider,
  useBackendAddressStore,
} from '@client/providers'
import type { GetServerSideProps } from 'next'
import { IUserProfile } from '@/client/models/user.model'
import { UserProfile } from '@client/components/screens/profile'

import { getUserProfilebyDomain } from '@/client/services/user.service'
import { useEffect } from 'react'

interface SubDomainProps {
  slug?: string | null
  userProfile?: IUserProfile | null
  host: string
  port: number
}

const HomePage: NextPageWithLayout<SubDomainProps> = ({
  slug,
  userProfile,
  host,
  port,
}) => {
  const { setHost, setPort } = useBackendAddressStore()

  useEffect(() => {
    setHost(host)
    setPort(port)
  }, [host, port, setHost, setPort])

  return (
    <>
      {slug ? (
        <>
          {userProfile ? (
            <UserProfile data={userProfile} />
          ) : (
            <div>free domain: {slug}</div>
          )}
        </>
      ) : (
        <Home />
      )}
    </>
  )
}
export default HomePage

export const getServerSideProps: GetServerSideProps = async (context) => {
  // // connect to your db to check if it exists, make a webservice call...
  let slug = null
  let userProfile = null
  const { req } = context
  if (req) {
    const host = req.headers.host
    const parts = host.split('.')
    if (parts.length > 1) {
      slug = parts[0]
      userProfile = await getUserProfilebyDomain<IUserProfile>({
        value: slug,
      })
      //console.log(userProfile)
    }
    //console.log(slug)
  }
  const host =
    process.env.NODE_ENV === 'development'
      ? process.env.DEV_HOST
      : process.env.PROD_HOST

  const port = process.env.ROOT_PORT

  return {
    props: {
      slug,
      userProfile,
      host,
      port,
    },
  }
}

HomePage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Providers themeProps={HomePage.theme}>
      <BackendAddressProvider>
        <Layout title="Home" description="Resent posts.">
          {page}
        </Layout>
      </BackendAddressProvider>
    </Providers>
  )
}

HomePage.theme = {
  themes: ['daisy', 'cmyk'],
}
