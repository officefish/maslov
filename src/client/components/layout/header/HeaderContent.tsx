import { FC } from 'react'
import Link from 'next/link'
import HeaderNavigation from './HeaderNavigation'
import Logo from '@client/components/ui/logo/Logo'

import { HeaderDescriptionWrapper, HeaderDescription } from './styled-header'

const HeaderContent: FC = () => {
  return (
    <>
      <HeaderDescriptionWrapper>
        <Logo />
        <HeaderDescription $fontFamily="old-english">
          <span>Site</span>
          <span className="hidden md:inline-flex md:ml-1">
            about market trending
          </span>
          <span className="hidden xl:inline-flex xl:mx-1">
            via special analytics
          </span>
          <Link
            className="hidden xl:inline-flex cursor-pointer huver:underline hover:text-cyan-500"
            href="https://github.com/officefish"
          >
            office fish
          </Link>
          <span>.</span>
        </HeaderDescription>
      </HeaderDescriptionWrapper>
      <HeaderNavigation />
    </>
  )
}

export default HeaderContent
