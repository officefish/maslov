import { INestApplication, Logger } from '@nestjs/common'
import { fastifyCookie } from '@fastify/cookie'
import type { FastifyCookieOptions } from '@fastify/cookie'

declare module 'fastify' {
  interface FastifyInstance {
    cookieOptions: FastifyCookieOptions
  }
}

export function initializeCookies(app: INestApplication) {
  const parseOptions = {
    domain: '.localhost',
    httpOnly: process.env.COOKIE_HTTPONLY,
    path: process.env.COOKIE_PATH,
    secure: process.env.COOKIE_SECURE,
    sameSite: 'lax',
  }

  const server = app.getHttpAdapter().getInstance()

  server.decorate('cookieOptions', parseOptions)

  const cookieContext = {}
  server.decorateReply('cookies', { getter: () => cookieContext })

  const secret = process.env.COOKIE_SIGNATURE

  server.register(fastifyCookie, {
    secret,
    hook: 'onRequest',
    parseOptions,
  } as unknown as FastifyCookieOptions)

  Logger.log('Fastify cookies initialized', 'Bootstrap')
}
