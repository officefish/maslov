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

const UpdateWidgetSchema = z.object({
  id: z.string(),
  api_function: z.string(),
  options: z.string().optional(),
})

const DeleteWidgetSchema = z.object({
  id: z.string(),
})

export class CreateWidgetDto extends createZodDto(CreateWidgetSchema) {}
export class UpdateWidgetDto extends createZodDto(UpdateWidgetSchema) {}
export class DeleteWidgetDto extends createZodDto(DeleteWidgetSchema) {}
