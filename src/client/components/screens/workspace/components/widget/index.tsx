import {
  //useProviderDataSWR,
  useWidgetDataSWR,
} from '@/client/services/workspace.service'
import { FC, useState, useEffect } from 'react'

//import { Slot, ISlot } from '@/client/models/exchange.types'
import WidgetTable from './table'

import { parser } from '@/client/services/parser/alpha-vintage'

// <FontAwesomeIcon icon="fa-solid fa-square-root-variable" />
interface IWidget {
  workspaceId?: string
  id: string
}

import { ViewMode } from './types'
import WidgetTabs from './tabs'
import WidgetCharts from './charts'
import useChartConfig from '@/client/services/chart.service'
import { UserSerie } from 'react-charts'

// const series = [
//   {
//     label: 'IBM',
//     data: fakeSlots,
//   },
// ] satisfies ISeries[]

const Widget: FC<IWidget> = (props) => {
  const { id } = props

  const { widgetData, trigger, error } = useWidgetDataSWR(id)
  const [isWidgetDataValid, setIsWidgetDataValid] = useState(false)

  const [mode, setMode] = useState<ViewMode>(ViewMode.TABLE)

  const { data: chartData } = useChartConfig({
    series: 2,
    dataType: 'time',
  })

  const [providerData, setProviderData] =
    useState<UserSerie<unknown>[]>(chartData)

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
      const { symbol } = JSON.parse(widgetData?.options)
      const response = await fetch(
        `http://localhost:8001/api/v1/data/alpha-vintage/daily?symbol=${symbol}`,
      )
      return await response.json()
    }

    if (widgetData) {
      fetchData().then((response) => {
        //console.log(response.data)
        const data = parser('daily', response.data)
        setProviderData(data)
        //console.log(chartData)
        //console.log(data)
        //setProviderData(data)
        //let entries = Object.entries(response.data)
        //const slots = entries[1][1]
        //console.log(slots)
        //entries = Object.entries(slots)
        //console.log(entries)
        //setProviderData(entries)
      })
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

  return (
    <div className="w-full md:w-[80%] card card-normal bg-base-300 dark:bg-base-300-dark shadow-xl flex flex-col items-center p-4">
      <div className="text-sm text-primary dark:text-primary-dark">
        Alpha-Vintage provider
      </div>
      <div className="flex flex-row justify-between w-full h-16 items-center">
        <div>Provider fields</div>
        <WidgetTabs mode={mode} setMode={setMode} />
      </div>
      {mode === ViewMode.TABLE && <WidgetTable data={providerData} />}
      {mode === ViewMode.CHART && <WidgetCharts data={providerData} />}
    </div>
  )
}
export default Widget
