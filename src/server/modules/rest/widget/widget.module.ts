import { Module } from '@nestjs/common'
import { PrismaService } from '@modules/prisma/prisma.service'
import { UserService } from '@modules/rest/user/user.service'
import { CryptoService } from '@modules/crypto/crypto.service'
import { JwtService } from '@nestjs/jwt'

import { AccessoryService } from '@modules/accessory/accessory.service'
import { AccessoryModule } from '@modules/accessory/accessory.module'
import { WorkspaceService } from '@modules/rest/workspace/workspace.service'

import { WidgetController } from './widget.controller'
import { WidgetService } from './widget.service'
import { WorkspaceModule } from '@modules/rest/workspace/workspace.module'

@Module({
  imports: [AccessoryModule, WorkspaceModule],
  controllers: [WidgetController],
  providers: [
    WidgetService,
    WorkspaceService,
    PrismaService,
    UserService,
    CryptoService,
    JwtService,
    AccessoryService,
  ],
})
export class WidgetModule {}
