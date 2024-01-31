import { Injectable } from '@nestjs/common'


import { IBM_DAILY } from './faker/ibm.daily'
import { IBM_WEEKLY } from './faker/ibm.weekly'
import { IBM_MONTHLY } from './faker/ibm.monthly'

@Injectable()
export class FakeService {

  fakeDaily() {
    return IBM_DAILY
  }

  fakeWeekly() {
    return IBM_WEEKLY
  }

  fakeMonthly() {
    return IBM_MONTHLY
  }
}