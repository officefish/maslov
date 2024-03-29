import { Module } from '@nestjs/common'
import { ExchangeDataController } from './exchange-data.controller'
import { ExchangeDataService } from './exchange-data.service'
import { AppConfigService } from '../../config/config.service'
import { AlphaVintageService } from './alpha-vintage.service'
import { AccessoryModule } from '../../accessory/accessory.module'
import { FakeService } from './fake.service'
import { AuthService } from '../auth/auth.service'
import { UserService } from '../user/user.service'

@Module({
  imports: [AccessoryModule],
  controllers: [ExchangeDataController],
  providers: [
    AppConfigService,
    ExchangeDataService,
    AlphaVintageService,
    FakeService,
    UserService,
    AuthService,
  ],
})
export class ExchangeDataModule {}
