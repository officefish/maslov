import { NextPageWithLayout } from '@client/utilities/layout.types'
import Layout from '@client/components/layout/Layout'
import Providers, { BackendAddressProvider } from '@client/providers'
import { GetServerSideProps } from 'next'
import Workspace, {
  IWorkspaceProps,
} from '@/client/components/screens/workspace'

const WorkspacePage: NextPageWithLayout<IWorkspaceProps> = (props) => {
  return <Workspace id={props.id} />
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
