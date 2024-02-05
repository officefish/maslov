import { IMetadata, ISlot } from '@client/models/workspace.types'

export interface IWidgetState {
  metadata?: IMetadata
  slots?: ISlot[]
  startDate?: Date
  endDate?: Date
}

export interface IWidgetActions {
  setMetadata: (metadata: IMetadata) => void
  setSlots: (slots: ISlot[]) => void
  setInterval: (startDate: Date, endDate: Date) => void
  //getIntervalSlots: () => ISlot[]
}
