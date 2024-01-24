import {
  //RegisterOptions,
  // FieldValues,
  //UseFormRegisterReturn,
  useForm,
} from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

export default function useNewWorkspaceValidator() {
  const title = {
    title: z
      .string({
        required_error: 'Password is required',
        invalid_type_error: 'Password must be a string',
      })
      .min(2, { message: 'Must be 2 or more characters long' })
      .max(24, { message: 'Must be 24 or less characters long' }),
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

  return { register, handleSubmit, errors }
}
