import {
  //useProviderDataSWR,
  useWidgetDataSWR,
} from '@/client/services/workspace.service'
import { FC, useState, useEffect, MouseEvent } from 'react'
import WidgetTableItem from './item'

import { WidgetTab } from '../../workspace.styled'

import { Slot, ISlot } from '@/client/models/exchange.types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChartPie,
  faTable,
  faSquareRootVariable,
} from '@fortawesome/free-solid-svg-icons'
import WidgetTable from './table'

// <FontAwesomeIcon icon="fa-solid fa-square-root-variable" />
interface IWidget {
  workspaceId?: string
  id: string
}

enum ViewMode {
  FUNCTION = 'function',
  TABLE = 'table',
  CHART = 'chart',
}

const getRandomSlot = (): ISlot => {
  const slot = new Slot()
  slot.date = new Date()
  slot.open = +Math.random().toFixed(2)
  slot.close = +Math.random().toFixed(2)
  slot.high = +Math.random().toFixed(2)
  slot.low = +Math.random().toFixed(2)
  slot.volume = +Math.random().toFixed(2)
  return slot
}

const fakeSlots = new Array(20).fill(getRandomSlot()) satisfies ISlot[]

const Widget: FC<IWidget> = (props) => {
  const { id } = props

  const { widgetData, trigger, error } = useWidgetDataSWR(id)
  const [isWidgetDataValid, setIsWidgetDataValid] = useState(false)

  const [mode, setMode] = useState<ViewMode>(ViewMode.TABLE)

  const [providerData, setProviderData] = useState<Slot[]>()
  //const { providerData, providerTrigger, providerError } =
  //useProviderDataSWR(widgetData)

  useEffect(() => {
    if (!isWidgetDataValid) {
      trigger()
      setIsWidgetDataValid(true)
    }
    if (error) {
      console.log('Network error with widget data')
    }

    const fetchData = async () => {
      const { symbol, interval } = JSON.parse(widgetData?.options)
      const response = await fetch(
        `http://localhost:8001/api/v1/data/alpha-vintage/intraday?symbol=${symbol}&interval=${interval}`,
      )
      return await response.json()
    }

    if (widgetData) {
      //fetchData().then((response) => {
      //console.log(response)

      setProviderData(fakeSlots)
      //let entries = Object.entries(response.data)
      //const slots = entries[1][1]
      //console.log(slots)
      //entries = Object.entries(slots)
      //console.log(entries)
      //setProviderData(entries)
      //})
      //console.log(json)
      //providerTrigger()
      //console.log('triggerProvider')
    }

    //if (providerError) {
    //  console.log(providerError)
    // }

    //console.log(widgetData)
    //console.log(providerData)
  }, [
    widgetData,
    trigger,
    //providerTrigger,
    error,
    isWidgetDataValid,
    //providerData,
    //providerError,
  ])

  const onFunctionClick = () => setMode(ViewMode.FUNCTION)
  const onChartClick = () => setMode(ViewMode.CHART)
  const onTableClick = () => setMode(ViewMode.TABLE)

  return (
    <div className="w-full md:w-[80%] card card-normal bg-base-300 dark:bg-base-300-dark shadow-xl flex flex-col items-center p-4">
      <div className="text-sm text-primary dark:text-primary-dark">
        Alpha-Vintage provider
      </div>
      <div className="flex flex-row justify-between w-full h-16 items-center">
        <div>Provider fields</div>

        <div role="tablist" className="tabs tabs-boxed">
          <WidgetTab
            $active={mode === ViewMode.FUNCTION}
            role="tab"
            onClick={onFunctionClick}
          >
            <FontAwesomeIcon icon={faSquareRootVariable} />
          </WidgetTab>
          <WidgetTab
            $active={mode === ViewMode.CHART}
            role="tab"
            onClick={onChartClick}
          >
            <FontAwesomeIcon icon={faChartPie} />
          </WidgetTab>
          <WidgetTab
            $active={mode === ViewMode.TABLE}
            role="tab"
            onClick={onTableClick}
          >
            <FontAwesomeIcon icon={faTable} />
          </WidgetTab>
        </div>
      </div>
      {mode === ViewMode.TABLE && <WidgetTable slots={providerData} />}
    </div>
  )
}
export default Widget
