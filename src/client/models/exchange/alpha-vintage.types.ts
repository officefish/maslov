import { UserSerie } from 'react-charts'

export enum CoreStock {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
}

export interface IMetadata {
  symbol: string
  api_function: string
}

export type ISlot = UserSerie<unknown>
