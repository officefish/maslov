import { FC, useState, MouseEvent } from 'react'
import { StyledFunctionalButton } from '../../workspace.styled'

import { faTrash, faGears } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import RemoveDialog from '../dialog/remove'
import UpdateWorkspaceDialog from '../dialog/update-workspace'
import { useWorkspaceValidator } from '../dialog/validator'

interface IWorkspaceHeader {
  title: string
  date: number
  onEdit: (data: any) => void
  onRemove: () => void
}

const WorkspaceHeader: FC<IWorkspaceHeader> = (props) => {
  const { title, date, onEdit, onRemove } = props
  const [isRemoveOpen, setIsRemoveOpen] = useState(false)
  const [isUpdateOpen, setIsUpdateOpen] = useState(false)

  const { register, handleSubmit, errors } = useWorkspaceValidator()

  const handleRemoveClick = (e: MouseEvent) => {
    e.preventDefault()
    setIsRemoveOpen(true)
  }

  const handleUpdateClick = (e: MouseEvent) => {
    e.preventDefault()
    setIsUpdateOpen(true)
  }

  const handleConfirmRemove = () => {
    setIsRemoveOpen(false)
    onRemove()
  }

  const handleConfirmUpdate = (data) => {
    //console.log(data)
    setIsUpdateOpen(false)
    onEdit(data)
    //onRemove()
  }

  return (
    <>
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
          <StyledFunctionalButton onClick={handleUpdateClick}>
            <FontAwesomeIcon icon={faGears} />
            <span className="pl-2">edit workspace</span>
          </StyledFunctionalButton>
          <StyledFunctionalButton onClick={handleRemoveClick}>
            <FontAwesomeIcon icon={faTrash} />
            <span className="pl-2">remove workspace</span>
          </StyledFunctionalButton>
        </div>
      </div>
      <RemoveDialog
        title="remove workspace"
        isOpen={isRemoveOpen}
        setIsOpen={setIsRemoveOpen}
        onRemove={handleConfirmRemove}
      />
      <UpdateWorkspaceDialog
        title="update workspace"
        isOpen={isUpdateOpen}
        setIsOpen={setIsUpdateOpen}
        submitHandler={handleConfirmUpdate}
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        value={title}
      />
    </>
  )
}
export default WorkspaceHeader
