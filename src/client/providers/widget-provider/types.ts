import { IMetadata, ISerie } from '@/client/models/exchange/alpha-vintage.types'
export interface IWidgetState {
  metadata?: IMetadata
  series?: ISerie[]
  startDate?: Date
  endDate?: Date
}

export interface IWidgetActions {
  setMetadata: (metadata: IMetadata) => void
  setSeries: (series: ISerie[]) => void
  setInterval: (startDate: Date, endDate: Date) => void
  //getIntervalSlots: () => ISlot[]
}
