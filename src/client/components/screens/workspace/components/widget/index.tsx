import {
  //useProviderDataSWR,
  useWidgetDataSWR,
} from '@/client/services/workspace.service'
import { FC, useState, useEffect } from 'react'
import WidgetTableItem from './item'

interface IWidget {
  workspaceId?: string
  id: string
}

const Widget: FC<IWidget> = (props) => {
  const { id } = props

  const { widgetData, trigger, error } = useWidgetDataSWR(id)
  const [isWidgetDataValid, setIsWidgetDataValid] = useState(false)

  //const [providerData, setProviderData] = useState<any>()
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
      fetchData().then((response) => {
        //console.log(response)
        let entries = Object.entries(response.data)
        const slots = entries[1][1]
        //console.log(slots)
        entries = Object.entries(slots)
        console.log(entries)
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
    <div>
      <div>{id}</div>
      <div>
        {/* {providerData ??
          providerData?.map((item, i) => (
            <WidgetTableItem key={i} data={item} />
          ))} */}
      </div>
    </div>
  )
}
export default Widget
