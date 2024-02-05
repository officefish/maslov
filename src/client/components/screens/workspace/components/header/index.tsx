import { FC } from 'react'
import { StyledFunctionalButton } from '../../workspace.styled'

import { faTrash, faGears } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface IWorkspaceHeader {
  title: string
  date: number
  onEdit: () => void
  onRemove: () => void
}

const WorkspaceHeader: FC<IWorkspaceHeader> = (props) => {
  const { title, date, onEdit, onRemove } = props
  return (
    <div className="bg-base-200 dark:bg-base-200-dark h-16 flex flex-row px-4 justify-between items-center">
      <div className="flex flex-row gap-4 items-center h-full">
        <span className="text-info dark:text-info-dark text-md dark:opacity-50 uppercase font-bold">
          {title}
        </span>
        <span className="text-info dark:text-info-dark text-xs dark:opacity-50">
          {new Date(date).toDateString()}
        </span>
      </div>
      <div className="pr-4 flex flex-row gap-2">
        <StyledFunctionalButton onClick={onEdit}>
          <FontAwesomeIcon icon={faGears} />
          <span className="pl-2">edit workspace</span>
        </StyledFunctionalButton>
        <StyledFunctionalButton onClick={onRemove}>
          <FontAwesomeIcon icon={faTrash} />
          <span className="pl-2">remove workspace</span>
        </StyledFunctionalButton>
      </div>
    </div>
  )
}
export default WorkspaceHeader
