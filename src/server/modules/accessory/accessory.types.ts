import { FastifyRequest, FastifyReply } from 'fastify'
import { CookieOptions } from '@fastify/session'
import { Role } from '@prisma/client'

export type RegenerateSessionInput = {
  request: FastifyRequest
  reply: FastifyReply
  userId?: string
  userRole?: Role
}

export type CreateCookieInput = {
  reply: FastifyReply
  name: string
  value: string
  options: CookieOptions
}

export type CreateTokensInput = {
  reply: FastifyReply
  userId: string
  sessionId: string
  options: CookieOptions
}
