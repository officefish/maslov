import { FC, MouseEvent, useState } from 'react'

import {
  StyledButton,
  StyledWorkspace,
  StyledWorkspaceGrid,
} from './workspace.styled'

import useNewWorkspaceValidator from './components/dialog/validator'
import NewWorkspaceDialog from './components/dialog'
import { useUserWorkspaces } from '@/client/services/workspace.service'

const WorkspacesList: FC = () => {
  /* body overflow: hidden style controller */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { workspaces } = useUserWorkspaces()
  console.log(workspaces)

  const [isNewWorkspaceOpen, setIsNewWorkspaceOpen] = useState(false)
  const { register, handleSubmit, errors } = useNewWorkspaceValidator()

  const showNewWorkspaceModal = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsNewWorkspaceOpen(true)
  }

  const submitHandler = () => {
    setIsNewWorkspaceOpen(false)
  }

  return (
    <>
      <StyledWorkspaceGrid>
        <StyledWorkspace>IBM daily</StyledWorkspace>
        <StyledWorkspace>AMAZON weekly</StyledWorkspace>
        <StyledWorkspace>CISCO vs Huawey</StyledWorkspace>
        <StyledButton onClick={showNewWorkspaceModal}>
          Add workspace
        </StyledButton>
      </StyledWorkspaceGrid>
      <NewWorkspaceDialog
        errors={errors}
        handleSubmit={handleSubmit}
        register={register}
        title={'New Workspace'}
        isOpen={isNewWorkspaceOpen}
        setIsOpen={setIsNewWorkspaceOpen}
        submitHandler={submitHandler}
      />
    </>
  )
}
export default WorkspacesList
