import { FC, useRef, MouseEvent } from 'react'
import useGlobalOverflowHidden from '@client/hooks/force-overflow'

import {
  StyledButton,
  StyledReadyButton,
  StyledCancelButton,
  StyledWorkspace,
  StyledWorkspaceGrid,
  StyledDialog,
  StyledModalBox,
  StyledForm,
  StyledFormWrapper,
  StyledFormHeader,
} from './workspace.styled'

import FormField from '@client/components/form/dev/field'
import {
  //RegisterOptions,
  // FieldValues,
  //UseFormRegisterReturn,
  useForm,
} from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

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
    closeModal()
    //throw new Error('Function not implemented.')
  }

  const closeModal = () => {
    if (modalRef && modalRef.current) {
      const modal = modalRef.current
      modal.close()
    }
  }

  const title = {
    name: z
      .string()
      .min(7, { message: 'Must be 7 or more characters long' })
      .max(24, { message: 'Must be 24 or less characters long' })
      .optional(),
  }

  const schema = z.object({
    ...title,
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })

  const submitHandler = () => {
    closeModal()
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
        <StyledModalBox>
          <StyledFormWrapper>
            <StyledFormHeader>New workspace</StyledFormHeader>
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
    </>
  )
}
export default WorkspacesList
