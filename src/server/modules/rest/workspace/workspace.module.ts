import { Module } from '@nestjs/common'
import { WorkspaceController } from './workspace.controller'
import { WorkspaceService } from './workspace.service'
import { PrismaService } from '@modules/prisma/prisma.service'
import { UserService } from '@modules/rest/user/user.service'
import { CryptoService } from '@modules/crypto/crypto.service'
import { JwtService } from '@nestjs/jwt'

import { AccessoryService } from '@modules/accessory/accessory.service'
import { AccessoryModule } from '@modules/accessory/accessory.module'

@Module({
  imports: [AccessoryModule],
  controllers: [WorkspaceController],
  providers: [
    WorkspaceService,
    PrismaService,
    UserService,
    CryptoService,
    JwtService,
    AccessoryService,
  ],
})
export class WorkspaceModule {}
