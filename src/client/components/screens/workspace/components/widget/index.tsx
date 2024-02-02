import {
  useUpdateWidget,
  //useProviderDataSWR,
  useWidgetDataSWR,
} from '@/client/services/workspace.service'
import { FC, useState, useEffect, MouseEvent } from 'react'

//import { Slot, ISlot } from '@/client/models/exchange.types'
import WidgetTable from './table'
import { faChartSimple } from '@fortawesome/free-solid-svg-icons'

import { parser, ParserError } from '@/client/services/parser/alpha-vintage'

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
import WithLoader from './loading'
import ErrorBlock from './error'
import WidgetHeader from './header'

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

  const [widgetMetadata, setWidgetMetadata] = useState<Metadata>(null)
  const [symbol, setSymbol] = useState(widgetMetadata?.symbol)

  const [parserError, setParserError] = useState<ParserError>(null)

  const [isLoading, setIsLoading] = useState(false)

  const {
    onSubmit,
    serverError: updateWidgetServerError,
    data: updateWidgetResponse,
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
      // const response = await fetch(
      //   `http://localhost:8001/api/v1/data/alpha-vintage/core?symbol=${symbol}&api_function=${api_function}`,
      // )
      const response = await fetch(
        `http://localhost:8001/api/v1/data/alpha-vintage/core/fake?symbol=${symbol}&api_function=${api_function}`,
      )
      // const response = await fetch(
      //   `http://localhost:8001/api/v1/data/alpha-vintage/core/invalid`,
      // )
      return await response.json()
    }

    if (widgetData) {
      setIsLoading(true)
      fetchData().then((response) => {
        const { metadata, slots, error } = parser(response)

        setIsLoading(false)

        if (!error) {
          setWidgetMetadata(metadata)
          setSymbol(metadata.symbol)
          setProviderData(slots)
          setParserError(null)
        } else {
          setParserError(error)
        }
      })
    }

    if (updateWidgetResponse && !isWidgetDataValid) {
      setIsWidgetDataValid(true)
    }

    if (updateWidgetServerError) {
      console.log(updateWidgetServerError)
    }
  }, [
    widgetData,
    trigger,
    error,
    isWidgetDataValid,
    updateWidgetResponse,
    updateWidgetServerError,
    //widgetMetadata,
    //symbol,
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
    setIsLoading(true)
    onSubmit(responseData)
  }

  const onWidgetRemove = () => {
    console.log('onWidgetRemove')
  }

  return (
    <>
      <div className="w-full md:w-[80%] card card-normal bg-base-300 dark:bg-base-300-dark shadow-xl flex flex-col items-center p-4">
        {/* <div className="w-full justify-end text-sm text-info/50 dark:text-info-dark/50 flex flex-row gap-4">
          Alpha-Vintage provider
          <button className="btn btn-xs btn-outline btn-info opacity-50 hover:opacity-100 btn-ghost">
            <FontAwesomeIcon icon={faTrash} />
            <span className="pl-2">remove widget</span>
          </button>
        </div> */}
        <WidgetHeader
          title="Alpha-Vintage provider"
          onRemove={onWidgetRemove}
        />
        <div className="flex flex-row justify-between w-full h-16 items-center">
          <div>
            <StyledButtonWidget onClick={showUpsetWidgetModal}>
              <FontAwesomeIcon icon={faChartSimple} />
              {widgetMetadata ? (
                <span>
                  {widgetMetadata.symbol} | {widgetMetadata.api_function}
                </span>
              ) : (
                <>unknown</>
              )}
            </StyledButtonWidget>
          </div>
          <WidgetTabs mode={mode} setMode={setMode} />
        </div>
        {parserError ? (
          <ErrorBlock message={parserError.message} />
        ) : (
          <WithLoader isLoading={isLoading}>
            {mode === ViewMode.TABLE && <WidgetTable data={providerData} />}
            {mode === ViewMode.CHART && <WidgetCharts data={providerData} />}
          </WithLoader>
        )}
      </div>
      <UpdateWidgetDialog
        symbol={symbol}
        core={CoreStock[widgetMetadata?.api_function?.toUpperCase()]}
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
