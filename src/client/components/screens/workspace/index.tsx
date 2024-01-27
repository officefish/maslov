import { FC, MouseEvent, useEffect, useState } from 'react'

//import useNewWorkspaceValidator from './components/dialog/validator'
//import NewWorkspaceDialog from './components/dialog'
import { useWorkspaceDataSWR } from '@/client/services/workspace.service'
import { StyledButtonWidget } from './workspace.styled'
//import WorkspacesListGrid from './components/grid'
//import { useNewWorkspace } from '@/client/services/workspace.service'

export interface IWorkspaceProps {
  id: string
}

const Workspace: FC<IWorkspaceProps> = (props) => {
  const { id } = props
  const { data, trigger, error } = useWorkspaceDataSWR(id)
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    if (!isValid) {
      trigger()
      setIsValid(true)
    }
    if (error) {
      console.log('Network error with workspace data')
    }
  }, [data, error, trigger, isValid, setIsValid])

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
        {/* <!-- --> */}
      </div>
      <StyledButtonWidget>New widget</StyledButtonWidget>
      {/* <h1 className="text-base-content dark:text-base-content-dark text-lg">
        {id}
      </h1> */}
    </>
  )
}
export default Workspace
