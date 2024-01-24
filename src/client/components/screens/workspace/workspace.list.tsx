import { FC, MouseEvent, useState } from 'react'

import useNewWorkspaceValidator from './components/dialog/validator'
import NewWorkspaceDialog from './components/dialog'
import { useUserWorkspacesSWR } from '@/client/services/workspace.service'
import WorkspacesListGrid from './components/grid'

const WorkspacesList: FC = () => {
  const { workspaces } = useUserWorkspacesSWR()
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
      <WorkspacesListGrid
        onClick={showNewWorkspaceModal}
        workspaces={workspaces}
      ></WorkspacesListGrid>
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
