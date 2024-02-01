import { DevFormFieldError } from '@/client/components/form/dev-form-styled'
import { ErrorSVG } from '@/client/components/ui/svg'
import { FC } from 'react'

interface IErrorBlock {
  message: string
}

const ErrorBlock: FC<IErrorBlock> = ({ message }) => {
  return (
    <div className="flex items-center justify-center w-full h-96">
      <DevFormFieldError>
        <ErrorSVG />
        {message}
      </DevFormFieldError>
    </div>
  )
}
export default ErrorBlock
