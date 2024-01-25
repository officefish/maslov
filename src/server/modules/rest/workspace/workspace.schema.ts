import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'

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

export class CreateWorkspaceDto extends createZodDto(CreateWorkspaceSchema) {}
export class GetWorkspaceDto extends createZodDto(GetWorkspaceSchema) {}
