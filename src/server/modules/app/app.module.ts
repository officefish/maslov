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
import { UploadModule } from '../rest/upload/upload.module'

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
