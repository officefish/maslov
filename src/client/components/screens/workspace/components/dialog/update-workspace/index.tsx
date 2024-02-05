import { FC, useRef, MouseEvent, useEffect } from 'react'
import useGlobalOverflowHidden from '@client/hooks/force-overflow'

import {
  StyledReadyInput,
  StyledCancelButton,
  StyledDialog,
  StyledModalBox,
  StyledFormBody,
  StyledFormWrapper,
  StyledFormHeader,
} from '../../../workspace.styled'

import FormField from '@client/components/form/dev/field'
import { FormProps } from '@/client/utilities/form.types'
interface UpdateWorkspaceProps extends FormProps {
  isOpen: boolean
  setIsOpen: (status: boolean) => void
  title: string | null
  value: string
}

const UpdateWorkspaceDialog: FC<UpdateWorkspaceProps> = (props) => {
  const modalRef = useRef<HTMLDialogElement>(null)

  const {
    title,
    submitHandler,
    register,
    errors,
    handleSubmit,
    setIsOpen,
    isOpen,
    value,
  } = props

  const { setIsOverflowHidden } = useGlobalOverflowHidden()
  const onDialogClose = () => setIsOverflowHidden(false)

  function cancelWorkspaceUpdate(e: MouseEvent<HTMLButtonElement>): void {
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
          <form
            className="flex glex-row justify-center"
            onSubmit={handleSubmit(submitHandler)}
          >
            <StyledFormBody>
              <FormField
                value={value}
                title="title"
                register={register}
                errors={errors}
              />
              <div className="h-[30%] m-8 flex">
                <StyledReadyInput type="submit" value={title} />
                <StyledCancelButton onClick={cancelWorkspaceUpdate}>
                  Cancel
                </StyledCancelButton>
              </div>
            </StyledFormBody>
          </form>
        </StyledFormWrapper>
      </StyledModalBox>
    </StyledDialog>
  )
}
export default UpdateWorkspaceDialog
