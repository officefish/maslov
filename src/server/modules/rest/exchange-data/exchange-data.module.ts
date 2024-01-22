import { Module } from '@nestjs/common'
import { ExchangeDataController } from './exchange-data.controller'
import { ExchangeDataService } from './exchange-data.service'
import { AppConfigService } from '../../config/config.service'
import { AlphaVintageService } from './alpha-vintage.service'
import { AccessoryModule } from '../../accessory/accessory.module'

@Module({
  imports: [AccessoryModule],
  controllers: [ExchangeDataController],
  providers: [AppConfigService, ExchangeDataService, AlphaVintageService],
})
export class ExchangeDataModule {}
