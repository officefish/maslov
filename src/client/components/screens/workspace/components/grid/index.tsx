import { FC, MouseEvent } from 'react'

import { StyledButton, StyledWorkspaceGrid } from '../../workspace.styled'
import { IWorkspace } from '@/client/models/workspace.types'
import WorkspacesListGridItem from './item'

interface IWorkspaceListGrid {
  workspaces: IWorkspace[]
  onClick: (e: MouseEvent<HTMLButtonElement>) => void
}

const WorkspacesListGrid: FC<IWorkspaceListGrid> = (props) => {
  const { workspaces, onClick } = props

  const onWorkspaceSelect = (workspaceId: string) => {
    console.log(workspaceId)
  }

  return (
    <StyledWorkspaceGrid>
      {workspaces?.map((item, i) => (
        <WorkspacesListGridItem
          key={i}
          id={item.id}
          onSelect={onWorkspaceSelect}
          title={item.title}
        />
      ))}
      <StyledButton onClick={onClick}>Add workspace</StyledButton>
    </StyledWorkspaceGrid>
  )
}
export default WorkspacesListGrid
