import { FC } from 'react'
import { useForm } from 'react-hook-form'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { zodResolver } from '@hookform/resolvers/zod'
import { useSignIn } from '@client/services/auth.service'
import { z } from 'zod'
import SignInForm from './forms/sign-in.form'

// Styled components
import {
  DevFormLayout,
  DevFormWrapper,
  DevFormHeader2,
  Copyright,
  DevFormFieldError,
} from '@client/components/form/dev-form-styled'

import { ErrorSVG } from '@client/components/ui/svg'

const email = {
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .email({ message: 'Invalid email address' }),
}

const password = {
  password: z
    .string({
      required_error: 'Password is required',
      invalid_type_error: 'Password must be a string',
    })
    .min(8, { message: 'Must be 8 or more characters long' }),
}

const schema = z.object({
  ...email,
  ...password,
})

const SignIn: FC = () => {
  const title = 'Sign In'

  const { onSubmit, serverError } = useSignIn()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })

  return (
    <DevFormLayout>
      <DevFormWrapper>
        <DevFormHeader2>{title}</DevFormHeader2>
        {serverError?.message && (
          <DevFormFieldError>
            <ErrorSVG />
            {serverError.message?.toString()}
          </DevFormFieldError>
        )}
        <SignInForm
          title={title}
          register={register}
          handleSubmit={handleSubmit}
          submitHandler={onSubmit}
          errors={errors}
        />
        <Copyright>&#x00a9; 2023 Techies Group. All rights reserved.</Copyright>
      </DevFormWrapper>
    </DevFormLayout>
  )
}
export default SignIn
