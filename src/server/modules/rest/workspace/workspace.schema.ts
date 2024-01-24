import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'

const title = {
  title: z.string().min(2).max(24),
}

const CreateWorkspaceSchema = z.object({
  ...title,
})

export class CreateWorkspaceDto extends createZodDto(CreateWorkspaceSchema) {}
