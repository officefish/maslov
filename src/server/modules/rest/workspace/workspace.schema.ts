import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'

const title = {
  title: z.string().min(5).max(120).optional(),
}

const CreateWorkspaceSchema = z.object({
  ...title,
})

export class CreateWorkspaceDto extends createZodDto(CreateWorkspaceSchema) {}
