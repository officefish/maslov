import { NextPageWithLayout } from '@client/utilities/layout.types'
import Layout from '@client/components/layout/Layout'
import Providers, { BackendAddressProvider } from '@client/providers'
import { GetServerSideProps } from 'next'

interface IWorkspaceProps {
  id: string
}

const WorkspacePage: NextPageWithLayout<IWorkspaceProps> = (props) => {
  const { id } = props
  return (
    <h1 className="text-base-content dark:text-base-content-dark text-lg">
      {id}
    </h1>
  )
}
export default WorkspacePage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query
  if (!id) {
    return { notFound: true }
  }
  return {
    props: {
      id,
    },
  }
}

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
