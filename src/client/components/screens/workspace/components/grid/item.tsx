import { FC, MouseEvent } from 'react'

import {
  //StyledButton,
  StyledWorkspace,
  //StyledWorkspaceGrid,
} from '../../workspace.styled'
import { IWorkspace } from '@/client/models/workspace.types'

interface IWorkspaceListItem extends IWorkspace {
  key: number
  onSelect: (workspaceId: string) => void
}

const WorkspacesListGridItem: FC<IWorkspaceListItem> = (props) => {
  const { title, key, id, onSelect } = props

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    onSelect(id)
  }

  return (
    <StyledWorkspace key={key} onClick={handleClick}>
      {title}
    </StyledWorkspace>
  )
}
export default WorkspacesListGridItem
