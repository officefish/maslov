import { Injectable } from '@nestjs/common'
import { PrismaService } from '@modules/prisma/prisma.service'
import { UserService } from '@modules/rest/user/user.service'
import { CryptoService } from '@modules/crypto/crypto.service'
//import { User } from '@prisma/client'
//import { Prisma } from '@prisma/client'
import { User as UserModel } from '@prisma/client'

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
    private cryptoService: CryptoService,
  ) {}

  async signIn(email: string, password: string): Promise<UserModel | null> {
    const user = await this.userService.user({ email: email })
    const samePassword = await this.cryptoService.compare(
      password,
      user?.password || '',
    )
    if (!user || !samePassword) return null

    return user //new Promise(() => user.id)
  }

  /*
  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    })
  }
  */

  /*
  async function login(request:FastifyRequest<{
    Body: LoginInput
  }>, reply:FastifyReply) 
  {
    const {email, password} = request.body
    const prisma = request.server.prisma
    const bcrypt = request.server.bcrypt
  
    try {
       
        const user = await userService.GetUniqueUser(prisma, {email})
        const samePassword = await service.Compare(bcrypt, password, user?.password || '')
        if (!user || !samePassword) {
          reply.code(reply.codeStatus.UNAUTHORIZED).send({error:{ message:'invalid email or password'}})
          return
        }
        // If the user has enabled two-factor authentication (2FA) ...
        // Don't login until a 2FA code is provided.
        if (user.secret) { 
          reply.code(reply.codeStatus.FORBIDDEN).send({userId: user.id, status: '2FA'})
          return
        } 
        // 2FA is not enabled for this account,
        // so create a new session for this user.
        //await updateSession(request, reply, user)
        const userId = user.id
        const userRole = user.role
        const {sessionToken} = await service.RegenerateSession({request, reply, userId, userRole})
  
        await createTokenCookies({ userId, sessionToken, request, reply})
        
        if (!user.verified) {
          await sendVerifyEmail(request, reply, email)
        }
  
        const payload = {
          id: user?.id,
          email: user?.email,
          name: user?.name,
          verified: user?.verified,
          authenticated: true,
          role: user?.role
        }
        reply.code(reply.codeStatus.ACCEPTED).send(payload)
  
    } catch (e) {
      reply.code(500).send(e)
    }
  }
  */
}
