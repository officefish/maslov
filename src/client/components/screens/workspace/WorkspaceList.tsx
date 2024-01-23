import { FC } from 'react'

import {
  StyledButton,
  StyledWorkspace,
  StyledWorkspaceGrid,
} from './workspace.styled'

const WorkspacesList: FC = () => {
  return (
    <StyledWorkspaceGrid>
      <StyledWorkspace>IBM daily</StyledWorkspace>
      <StyledWorkspace>AMAZON weekly</StyledWorkspace>
      <StyledWorkspace>CISCO vs Huawey</StyledWorkspace>
      <StyledButton>Add workspace</StyledButton>
    </StyledWorkspaceGrid>
  )
}
export default WorkspacesList
