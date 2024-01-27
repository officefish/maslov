import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'

import { AppConfigModule } from '@modules/config/config.module'

import { CoreModule } from '@modules/core/core.module'
import { PrismaModule } from '@modules/prisma/prisma.module'
import { CryptoModule } from '@modules/crypto/crypto.module'
import { AccessoryModule } from '@modules/accessory/accessory.module'

import { AuthModule } from '@modules/rest/auth/auth.module'
import { UserModule } from '@modules/rest/user/user.module'
import { PostModule } from '@modules/rest/post/post.module'
import { UploadModule } from '@modules/rest/upload/upload.module'
import { ExchangeDataModule } from '@modules/rest/exchange-data/exchange-data.module'
import { WorkspaceModule } from '../rest/workspace/workspace.module'
import { WidgetModule } from '../rest/widget/widget.module'

//import { ServeStaticModule } from '@nestjs/serve-static'
//import { join } from 'path'

//import Next from 'next'
//import { RenderModule } from 'nest-next'

@Module({
  imports: [
    CoreModule,
    PrismaModule,
    AppConfigModule,
    CryptoModule,
    AccessoryModule,
    UserModule,
    AuthModule,
    PostModule,
    UploadModule,
    ExchangeDataModule,
    WorkspaceModule,
    WidgetModule,
    //RenderModule.forRootAsync(Next({})),
    //ServeStaticModule.forRoot({
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    //rootPath: require('app-root-path').resolve('/public'),
    //  rootPath: join(__dirname, '..', 'client'),
    //  renderPath: '/src/public/*',
    //}),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
