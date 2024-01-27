import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'

//import { DataProvider } from '@prisma/client'
//const roleEnum = z.nativeEnum(DataProvider)
//import { Prisma } from '@prisma/client'

const CreateWidgetSchema = z.object({
  workspaceId: z.string(),
  api_function: z.string(),
  options: z.string().optional(),
})

export class CreateWidgetDto extends createZodDto(CreateWidgetSchema) {}