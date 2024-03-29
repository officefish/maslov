import { FC, MouseEvent, useEffect, useState } from 'react'

import { useUpsetWidgetValidator } from './components/dialog/validator'

import {
  useDeleteWorkspace,
  useNewWidget,
  useUpdateWorkspace,
  useWorkspaceDataSWR,
} from '@/client/services/workspace.service'
import { StyledButtonWidget } from './workspace.styled'
import WidgetList from './components/grid/widget'
import UpsetWidgetDialog from './components/dialog/upset-widget'
import { CoreStock } from '@/client/models/exchange/alpha-vintage.types'
import WorkspaceHeader from './components/header'

export interface IWorkspaceProps {
  id: string
}

const Workspace: FC<IWorkspaceProps> = (props) => {
  const { id } = props
  const { workspaceData, trigger, error } = useWorkspaceDataSWR(id)
  const [isValid, setIsValid] = useState(false)

  const [isUpsetWidgetOpen, setIsUpsetWidgetOpen] = useState(false)
  const { register, handleSubmit, errors } = useUpsetWidgetValidator()

  const showUpsetWidgetModal = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsUpsetWidgetOpen(true)
  }

  const { onSubmit, serverError, data: newWidgetResponse } = useNewWidget()

  const { onSubmit: onRemoveSubmit, serverError: removeServerError } =
    useDeleteWorkspace()

  const {
    onSubmit: onUpdateSubmit,
    serverError: updateServerError,
    data: updateWorkspaceResonse,
  } = useUpdateWorkspace()

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

    if (removeServerError) {
      console.log(removeServerError)
    }

    if (updateServerError) {
      console.log(updateServerError)
    }

    if (newWidgetResponse) {
      if (newWidgetResponse?.statusCode === 201) {
        setIsValid(false)
        setIsUpsetWidgetOpen(false)
      }
    }
    if (updateWorkspaceResonse) {
      if (updateWorkspaceResonse?.statusCode === 201) {
        setIsValid(false)
      }
    }
  }, [
    error,
    trigger,
    isValid,
    setIsValid,
    serverError,
    removeServerError,
    updateServerError,
    newWidgetResponse,
    updateWorkspaceResonse,
  ])

  const onSubmitMiddleware = (middlewareData) => {
    const api_function = middlewareData['function']
    middlewareData['function'] = undefined
    const options = JSON.stringify(middlewareData)
    const responseData = {
      api_function,
      workspaceId: id,
      options,
    }
    setIsValid(false)
    onSubmit(responseData)
  }

  const onWidgetRemove = () => {
    trigger()
  }

  const handleEditWorkspace = (data) => {
    console.log('handleEditWorkspace')
    const editWorkspacePayload = {
      title: data.title,
      id,
    }
    onUpdateSubmit(editWorkspacePayload)
  }

  const handleRemoveWorkspace = () => {
    console.log('handleRemoveWorkspace')
    onRemoveSubmit({ id })
  }

  return (
    <>
      <WorkspaceHeader
        title={workspaceData?.title}
        date={workspaceData?.date}
        onEdit={handleEditWorkspace}
        onRemove={handleRemoveWorkspace}
      />
      <div className="w-full">
        <WidgetList
          onWidgetRemove={onWidgetRemove}
          widgets={workspaceData?.widgets}
        />
        <StyledButtonWidget onClick={showUpsetWidgetModal}>
          New widget
        </StyledButtonWidget>
      </div>
      <UpsetWidgetDialog
        errors={errors}
        handleSubmit={handleSubmit}
        register={register}
        title={'New Widget'}
        isOpen={isUpsetWidgetOpen}
        setIsOpen={setIsUpsetWidgetOpen}
        submitHandler={onSubmitMiddleware}
        symbol=""
        core={CoreStock.DAILY}
      />
      {/* <h1 className="text-base-content dark:text-base-content-dark text-lg">
        {id}
      </h1> */}
    </>
  )
}
export default Workspace
