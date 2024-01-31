import {
  useUpdateWidget,
  //useProviderDataSWR,
  useWidgetDataSWR,
} from '@/client/services/workspace.service'
import { FC, useState, useEffect, MouseEvent } from 'react'

//import { Slot, ISlot } from '@/client/models/exchange.types'
import WidgetTable from './table'
import { faChartSimple } from '@fortawesome/free-solid-svg-icons'

import { parser } from '@/client/services/parser/alpha-vintage'

import { CoreStock } from '@/client/models/exchange/alpha-vintage.types'

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
import { useUpsetWidgetValidator } from '../dialog/validator'
import { StyledButtonWidget } from '../../workspace.styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import UpdateWidgetDialog from '../dialog/upset-widget'
import { Metadata } from '@/client/models/exchange/alpha-vintage.types'

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

  const [ widgetMetadata, setWidgetMetadata ] = useState<Metadata>(null)


  const {
    onSubmit,
    serverError: updateWidgetServerError,
    data: updateWidgetResponse
  } = useUpdateWidget()

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
      const api_function = widgetData?.api_function
      const response = await fetch(
        `http://localhost:8001/api/v1/data/alpha-vintage/core?symbol=${symbol}&api_function=${api_function}`,
      )
      return await response.json()
    }

    if (widgetData) {
      fetchData().then((response) => {
        //console.log(response.data)
        const { metadata, slots } = parser(response.data)
        setWidgetMetadata(metadata)
        setProviderData(slots)
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

    if(updateWidgetResponse && !isWidgetDataValid) {
      setIsWidgetDataValid(true)
    }

    if(updateWidgetServerError) {
      console.log(updateWidgetServerError)
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
    updateWidgetResponse,
    updateWidgetServerError,
    //providerData,
    //providerError,
  ])

  const [isUpsetWidgetOpen, setIsUpsetWidgetOpen] = useState(false)
  const { register, handleSubmit, errors } = useUpsetWidgetValidator()

  const showUpsetWidgetModal = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsUpsetWidgetOpen(true)
  }

 

  const onSubmitMiddleware = (middlewareData) => {
    const api_function = middlewareData['function']
    middlewareData['function'] = undefined
    const options = JSON.stringify(middlewareData)
    const responseData = {
      api_function,
      id,
      options,
    }
    //setIsValid(false)
    setIsWidgetDataValid(false)
    setIsUpsetWidgetOpen(false)
    onSubmit(responseData)
  }

  return (
    <>
      <div className="w-full md:w-[80%] card card-normal bg-base-300 dark:bg-base-300-dark shadow-xl flex flex-col items-center p-4">
        <div className="text-sm text-primary dark:text-primary-dark">
          Alpha-Vintage provider
        </div>
        <div className="flex flex-row justify-between w-full h-16 items-center">
          <div>
            <StyledButtonWidget onClick={showUpsetWidgetModal}>
              <FontAwesomeIcon icon={faChartSimple} />
              { widgetMetadata 
                ? (<span>{widgetMetadata.symbol} | {widgetMetadata.api_function}</span>) 
                : (<>unknown</>)
              }  
            </StyledButtonWidget>
          </div>
          <WidgetTabs mode={mode} setMode={setMode} />
        </div>
        {mode === ViewMode.TABLE && <WidgetTable data={providerData} />}
        {mode === ViewMode.CHART && <WidgetCharts data={providerData} />}
      </div>
      <UpdateWidgetDialog
        symbol={widgetMetadata.symbol}
        core={CoreStock[widgetMetadata.api_function.toUpperCase()]}
        errors={errors}
        handleSubmit={handleSubmit}
        register={register}
        title={'Update Widget'}
        isOpen={isUpsetWidgetOpen}
        setIsOpen={setIsUpsetWidgetOpen}
        submitHandler={onSubmitMiddleware}
      />
    </>
  )
}
export default Widget
