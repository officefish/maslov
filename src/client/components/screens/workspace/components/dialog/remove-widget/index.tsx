import { FC, useRef, SyntheticEvent, MouseEvent, useEffect } from 'react'
import useGlobalOverflowHidden from '@client/hooks/force-overflow'

import {
  StyledReadyInput,
  StyledCancelButton,
  StyledDialog,
  StyledModalBox,
  StyledFormBody,
  StyledFormWrapper,
  StyledFormHeader,
  //StyledDropdownButton,
  //StyledDropdownContent,
} from '../../../workspace.styled'

import { DevFormFieldWarning } from '@/client/components/form/dev-form-styled'
import { WarningSVG } from '@/client/components/ui/svg'

interface RemoveWidgetDialogProp {
  title: string
  isOpen: boolean
  setIsOpen: (status: boolean) => void
  onRemove: () => void
}

const RemoveWidgetDialog: FC<RemoveWidgetDialogProp> = (props) => {
  const modalRef = useRef<HTMLDialogElement>(null)

  const { setIsOpen, isOpen, title, onRemove } = props

  const { setIsOverflowHidden } = useGlobalOverflowHidden()
  const onDialogClose = () => setIsOverflowHidden(false)

  function cancelWidgetCration(e: MouseEvent<HTMLButtonElement>): void {
    e.preventDefault()
    setIsOpen(false)
  }

  useEffect(() => {
    if (!modalRef) return
    if (!modalRef.current) return
    const modal = modalRef.current
    isOpen ? modal.showModal() : modal.close()
  })

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    //console.log(onRemove)
    onRemove()
  }

  return (
    <StyledDialog ref={modalRef} onClose={onDialogClose}>
      <StyledModalBox>
        <StyledFormWrapper>
          <StyledFormHeader>{title}</StyledFormHeader>
          <form
            className="flex glex-row justify-center"
            onSubmit={handleSubmit}
          >
            <StyledFormBody>
              <DevFormFieldWarning>
                <WarningSVG />
                Are use sure you want to remove this widget?
              </DevFormFieldWarning>
              <div className="h-[30%] m-8 flex">
                <StyledReadyInput type="submit" value={title} />
                <StyledCancelButton onClick={cancelWidgetCration}>
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
export default RemoveWidgetDialog
