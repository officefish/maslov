import { Module } from '@nestjs/common'
import { ExchangeDataController } from './exchange-data.controller'
import { ExchangeDataService } from './exchange-data.service'

@Module({
  imports: [],
  controllers: [ExchangeDataController],
  providers: [ExchangeDataService],
})
export class ExchangeDataModule {}
