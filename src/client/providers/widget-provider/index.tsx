import { FC, PropsWithChildren, useRef, useContext } from 'react'
import { createStore, useStore } from 'zustand'
import { createContext } from 'react' // from 'zustand/context'
import { IWidgetState, IWidgetActions } from './types'
import { IMetadata, ISlot } from '@client/models/workspace.types'

type IWidgetStore = IWidgetState & IWidgetActions

const createWidgetStore = () =>
  createStore<IWidgetStore>()((set) => ({
    metadata: {},
    setMetadata: (newMetadata: IMetadata) =>
      set(() => ({ metadata: { ...newMetadata } })),
    slots: [],
    setSlots: (newSlots: ISlot[]) => set(() => ({ slots: newSlots })),
    startDate: new Date('August 19, 1911 23:15:30'),
    endDate: new Date(),
    setInterval: (startDate: Date, endDate: Date) =>
      set(() => ({ startDate, endDate })),
    //getIntervalSlots: () => get(() => ({ slots })),
  }))

type WidgetStore = ReturnType<typeof createWidgetStore>
const WidgetContext = createContext<WidgetStore | null>(null)

export const useUserProfileStore = () => {
  const api = useContext(WidgetContext)
  return {
    metadata: useStore(api, (state) => state.metadata),
    setMetadata: useStore(api, (state) => state.setMetadata),
    slots: useStore(api, (state) => state.slots),
    setSlots: useStore(api, (state) => state.setSlots),
    startDate: useStore(api, (state) => state.startDate),
    endDate: useStore(api, (state) => state.endDate),
    setInterval: useStore(api, (state) => state.setInterval),
  }
}

export const WidgetProvider: FC<PropsWithChildren> = ({ children }) => {
  const widgetStoreRef = useRef<WidgetStore>()
  if (!widgetStoreRef.current) {
    widgetStoreRef.current = createWidgetStore()
  }
  return (
    <WidgetContext.Provider value={widgetStoreRef.current}>
      {children}
    </WidgetContext.Provider>
  )
}
