import { FC, MouseEvent, useEffect, useState } from 'react'

import { useWorkspaceValidator } from './components/dialog/validator'
import NewWorkspaceDialog from './components/dialog/new-workspace'
import { useUserWorkspacesSWR } from '@/client/services/workspace.service'
import WorkspacesListGrid from './components/grid/workspace'
import { useNewWorkspace } from '@/client/services/workspace.service'

const WorkspacesList: FC = () => {
  const { workspaces, trigger } = useUserWorkspacesSWR()

  const { onSubmit, serverError, data } = useNewWorkspace()

  const [isNewWorkspaceOpen, setIsNewWorkspaceOpen] = useState(false)
  const { register, handleSubmit, errors } = useWorkspaceValidator()

  const showNewWorkspaceModal = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsNewWorkspaceOpen(true)
  }

  useEffect(() => {
    trigger()
    if (data?.statusCode === 201) {
      setIsNewWorkspaceOpen(false)
    }
    if (serverError) {
      //setIsNewWorkspaceOpen(false)
      console.log(serverError)
    }
  }, [data, serverError, setIsNewWorkspaceOpen, trigger])

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
        submitHandler={onSubmit}
      />
    </>
  )
}
export default WorkspacesList
