import { FC, MouseEvent } from 'react'

import {
  StyledButton,
  StyledWorkspace,
  StyledWorkspaceGrid,
} from '../../workspace.styled'
import { IWorkspace } from '@/client/models/workspace.types'

interface IWorkspaceListGrid {
  workspaces: IWorkspace[]
  onClick: (e: MouseEvent<HTMLButtonElement>) => void
}

const WorkspacesListGrid: FC<IWorkspaceListGrid> = (props) => {
  const { workspaces, onClick } = props

  console.log(workspaces)

  return (
    <StyledWorkspaceGrid>
      <StyledWorkspace>IBM daily</StyledWorkspace>
      <StyledWorkspace>AMAZON weekly</StyledWorkspace>
      <StyledWorkspace>CISCO vs Huawey</StyledWorkspace>
      <StyledButton onClick={onClick}>Add workspace</StyledButton>
    </StyledWorkspaceGrid>
  )
}
export default WorkspacesListGrid
