import { FC, PropsWithChildren } from 'react'

import { StyledHeader, HeaderOffset } from './styled-header'

const Header: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <StyledHeader>{children}</StyledHeader>
      <HeaderOffset />
    </>
  )
}
export default Header
