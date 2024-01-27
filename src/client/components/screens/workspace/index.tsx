import { FC, MouseEvent, useEffect, useState } from 'react'

import { useNewWidgetValidator } from './components/dialog/validator'
//import NewWorkspaceDialog from './components/dialog'
import { useWorkspaceDataSWR } from '@/client/services/workspace.service'
import { StyledButtonWidget } from './workspace.styled'
import NewWidgetDialog from './components/dialog/new-widget'
//import WorkspacesListGrid from './components/grid'
//import { useNewWorkspace } from '@/client/services/workspace.service'

export interface IWorkspaceProps {
  id: string
}

const Workspace: FC<IWorkspaceProps> = (props) => {
  const { id } = props
  const { data, trigger, error } = useWorkspaceDataSWR(id)
  const [isValid, setIsValid] = useState(false)

  const [isNewWidgetOpen, setIsNewWidgetOpen] = useState(false)
  const { register, handleSubmit, errors } = useNewWidgetValidator()

  const showNewWidgetModal = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsNewWidgetOpen(true)
  }

  useEffect(() => {
    if (!isValid) {
      trigger()
      setIsValid(true)
    }
    if (error) {
      console.log('Network error with workspace data')
    }
  }, [data, error, trigger, isValid, setIsValid])

  const onSubmitMiddleware = (data) => {
    console.log(data)
  }

  return (
    <>
      <div>
        <span className="text-base-content dark:text-base-content-dark">
          {data?.title}
        </span>
        <span className="text-base-content dark:text-base-content-dark">
          {data?.date}
        </span>
      </div>
      <div>
        <span>Widgets Grid</span>
        <StyledButtonWidget onClick={showNewWidgetModal}>
          New widget
        </StyledButtonWidget>
      </div>
      <NewWidgetDialog
        errors={errors}
        handleSubmit={handleSubmit}
        register={register}
        title={'New Widget'}
        isOpen={isNewWidgetOpen}
        setIsOpen={setIsNewWidgetOpen}
        submitHandler={onSubmitMiddleware}
      />
      {/* <h1 className="text-base-content dark:text-base-content-dark text-lg">
        {id}
      </h1> */}
    </>
  )
}
export default Workspace
