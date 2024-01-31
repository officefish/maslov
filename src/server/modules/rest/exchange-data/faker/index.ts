
import { IBM_DAILY } from './ibm.daily'
import { IBM_WEEKLY } from './ibm.weekly'
import { IBM_MONTHLY } from './ibm.monthly'

export type IFaker = {
    fakeDaily: () => any,
    fakeWeekly: () => any,
    fakeMonthly: () => any
} 

export default {
    fakeDaily: () => IBM_DAILY,
    fakeWeekly: () => IBM_WEEKLY,
    fakeMonthly: () => IBM_MONTHLY,
} satisfies IFaker