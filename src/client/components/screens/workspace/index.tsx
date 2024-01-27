import { FC, MouseEvent, useEffect, useState } from 'react'

import { useNewWidgetValidator } from './components/dialog/validator'
//import NewWorkspaceDialog from './components/dialog'
import {
  useNewWidget,
  useWorkspaceDataSWR,
} from '@/client/services/workspace.service'
import { StyledButtonWidget } from './workspace.styled'
import NewWidgetDialog from './components/dialog/new-widget'
import WidgetList from './components/grid/widget'
//import WorkspacesListGrid from './components/grid'
//import { useNewWorkspace } from '@/client/services/workspace.service'

export interface IWorkspaceProps {
  id: string
}

const Workspace: FC<IWorkspaceProps> = (props) => {
  const { id } = props
  const { workspaceData, trigger, error } = useWorkspaceDataSWR(id)
  const [isValid, setIsValid] = useState(false)

  const [isNewWidgetOpen, setIsNewWidgetOpen] = useState(false)
  const { register, handleSubmit, errors } = useNewWidgetValidator()

  const showNewWidgetModal = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsNewWidgetOpen(true)
  }

  const { onSubmit, serverError, data: newWidgetResponse } = useNewWidget() // TODO: also need to process serverError

  useEffect(() => {
    if (!isValid) {
      trigger()
      setIsValid(true)
    }
    if (error) {
      console.log('Network error with workspace data')
    }

    if (serverError) {
      console.log(serverError)
    }
    if (newWidgetResponse) {
      console.log(newWidgetResponse)
      if (newWidgetResponse?.statusCode === 201) {
        setIsNewWidgetOpen(false)
      }
    }
  }, [error, trigger, isValid, setIsValid, serverError, newWidgetResponse])

  const onSubmitMiddleware = (middlewareData) => {
    const options = JSON.stringify(middlewareData)
    const responseData = {
      api_function: 'intraday',
      workspaceId: id,
      options,
    }
    console.log(responseData)
    onSubmit(responseData)
  }

  return (
    <>
      <div>
        <span className="text-base-content dark:text-base-content-dark">
          {workspaceData?.title}
        </span>
        <span className="text-base-content dark:text-base-content-dark">
          {workspaceData?.date}
        </span>
      </div>
      <div>
        <WidgetList widgets={workspaceData?.widgets} />
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
