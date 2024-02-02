import { Injectable } from '@nestjs/common'

import { IBM_DAILY } from './faker/ibm.daily'
import { IBM_WEEKLY } from './faker/ibm.weekly'
import { IBM_MONTHLY } from './faker/ibm.monthly'
import { INVALID_API_CALL } from './faker/invalid.call'
import { API_LIMIT } from './faker/limits'
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

  invalidCall() {
    return INVALID_API_CALL
  }

  apiLimit() {
    return API_LIMIT
  }
}
