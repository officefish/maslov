import { FC, PropsWithChildren } from 'react'
import Header from './header/Header'
import HeaderContent from './header/HeaderContent'

import Meta, { IMeta } from '@client/components/seo'

const Layout: FC<PropsWithChildren<IMeta>> = ({
  title,
  description,
  children,
}) => {
  return (
    <Meta title={title} description={description}>
      <Header>
        <HeaderContent />
      </Header>
      {children}
    </Meta>
  )
}

export default Layout
