import { FC, useRef, useState, MouseEvent, useEffect } from 'react'
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

import { CoreStock } from '@/client/models/exchange/alpha-vintage.types'

import FormField from '@client/components/form/dev/field'
import { FormProps } from '@/client/utilities/form.types'
import { getEnumKeys } from '@/client/utilities/enum.utilities'
import SelectFormField from '@/client/components/form/dev/select.field'

interface NewWidgetDialogProps extends FormProps {
  isOpen: boolean
  setIsOpen: (status: boolean) => void
  symbol: string | null
  core: CoreStock | null
}

const UpdateWidgetDialog: FC<NewWidgetDialogProps> = (props) => {
  const modalRef = useRef<HTMLDialogElement>(null)

  const {
    title,
    submitHandler,
    register,
    errors,
    handleSubmit,
    setIsOpen,
    isOpen,
    core,
    symbol,
  } = props

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

  const [currentCore, setCurrentCore] = useState<CoreStock>(core)

  const handleCore = (e) => {
    setCurrentCore(CoreStock[e.target.value as keyof typeof CoreStock])
  }

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
                value={symbol}
                title="Symbol"
                register={register}
                errors={errors}
              />
              <SelectFormField
                title="Function"
                onChange={handleCore}
                value={currentCore}
                items={getEnumKeys(CoreStock)}
                register={register}
                errors={errors}
              />
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
export default UpdateWidgetDialog
