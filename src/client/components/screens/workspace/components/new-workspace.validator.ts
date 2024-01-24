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

  return { register, handleSubmit, errors }
}
