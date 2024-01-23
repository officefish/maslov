import { FC, useRef, MouseEvent } from 'react'
import useGlobalOverflowHidden from '@client/hooks/force-overflow'

import {
  StyledButton,
  StyledCancelButton,
  StyledWorkspace,
  StyledWorkspaceGrid,
  StyledDialog,
  StyledForm,
  StyledFormWrapper,
  StyledFormHeader,
} from './workspace.styled'

const WorkspacesList: FC = () => {
  const modalRef = useRef<HTMLDialogElement>(null)

  /* body overflow: hidden style controller */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isOverflowHidden, setIsOverflowHidden] = useGlobalOverflowHidden()
  const onDialogClose = () => setIsOverflowHidden(false)

  const showNewWorkspaceModal = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (modalRef && modalRef.current) {
      setIsOverflowHidden(true)
      const modal = modalRef.current
      modal.showModal()
    }
  }

  function cancelWorkspaceCration(e: MouseEvent<HTMLButtonElement>): void {
    e.preventDefault()
    if (modalRef && modalRef.current) {
      const modal = modalRef.current
      modal.close()
    }
    //throw new Error('Function not implemented.')
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
      <StyledDialog ref={modalRef} onClose={onDialogClose}>
        <StyledForm method="dialog">
          <StyledFormWrapper>
            <StyledFormHeader>New workspace</StyledFormHeader>
            <div>
              <StyledCancelButton onClick={cancelWorkspaceCration}>
                Cancel
              </StyledCancelButton>
            </div>
          </StyledFormWrapper>
        </StyledForm>
      </StyledDialog>
    </>
  )
}
export default WorkspacesList
