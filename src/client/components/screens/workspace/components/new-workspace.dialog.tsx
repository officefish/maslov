import { FC, useRef, MouseEvent, useEffect } from 'react'
import useGlobalOverflowHidden from '@client/hooks/force-overflow'

import {
  StyledReadyButton,
  StyledCancelButton,
  StyledDialog,
  StyledModalBox,
  StyledForm,
  StyledFormWrapper,
  StyledFormHeader,
} from '../workspace.styled'

import FormField from '@client/components/form/dev/field'
import { FormProps } from '@/client/utilities/form.types'

interface NewWorkspaceDialogProps extends FormProps {
  isOpen: boolean
  setIsOpen: (status: boolean) => void
}

const NewWorkspaceDialog: FC<NewWorkspaceDialogProps> = (props) => {
  const modalRef = useRef<HTMLDialogElement>(null)

  const {
    title,
    submitHandler,
    register,
    errors,
    handleSubmit,
    setIsOpen,
    isOpen,
  } = props

  /* body overflow: hidden style controller */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isOverflowHidden, setIsOverflowHidden] = useGlobalOverflowHidden()
  const onDialogClose = () => setIsOverflowHidden(false)

  function cancelWorkspaceCration(e: MouseEvent<HTMLButtonElement>): void {
    e.preventDefault()
    setIsOpen(false)
  }

  useEffect(() => {
    if (!modalRef) return
    if (!modalRef.current) return
    const modal = modalRef.current
    isOpen ? modal.showModal() : modal.close()
  })

  return (
    <StyledDialog ref={modalRef} onClose={onDialogClose}>
      <StyledModalBox>
        <StyledFormWrapper>
          <StyledFormHeader>{title}</StyledFormHeader>
          <StyledForm method="dialog">
            <FormField title="Title" register={register} errors={errors} />
          </StyledForm>
          <div className="h-[30%] m-8 flex">
            <StyledReadyButton onClick={handleSubmit(submitHandler)}>
              New Workspace
            </StyledReadyButton>
            <StyledCancelButton onClick={cancelWorkspaceCration}>
              Cancel
            </StyledCancelButton>
          </div>
        </StyledFormWrapper>
      </StyledModalBox>
    </StyledDialog>
  )
}
export default NewWorkspaceDialog