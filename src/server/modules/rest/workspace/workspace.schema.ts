import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'

//import { DataProvider } from '@prisma/client'
//const roleEnum = z.nativeEnum(DataProvider)
//import { Prisma } from '@prisma/client'

const title = {
  title: z.string().min(2).max(24),
}

const id = {
  //id: z.instanceof(Prisma.ObjectId()),
  id: z.string(),
}

const CreateWorkspaceSchema = z.object({
  ...title,
})

const GetWorkspaceSchema = z.object({
  ...id,
})

const CreateWidgetSchema = z.object({
  api_function: z.string(),
  options: z.string().optional(),
})

const DeleteWorkspaceSchema = z.object({
  ...id,
})

const UpdateWorkspaceSchema = z.object({
  ...id,
  ...title,
})

export class CreateWorkspaceDto extends createZodDto(CreateWorkspaceSchema) {}
export class GetWorkspaceDto extends createZodDto(GetWorkspaceSchema) {}
export class CreateWidgetDto extends createZodDto(CreateWidgetSchema) {}
export class DeleteWorkspaceDto extends createZodDto(DeleteWorkspaceSchema) {}
export class UpdateWorkspaceDto extends createZodDto(UpdateWorkspaceSchema) {}
