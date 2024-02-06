import {
  useDeleteWidget,
  useUpdateWidget,
  useWidgetDataSWR,
} from '@/client/services/workspace.service'
import { FC, useState, useEffect } from 'react'

import WidgetTable from './table'
import { parser, ParserError } from '@/client/services/parser/alpha-vintage'
import { CoreStock } from '@/client/models/exchange/alpha-vintage.types'

// <FontAwesomeIcon icon="fa-solid fa-square-root-variable" />
import { ViewMode } from './types'
import WidgetCharts from './charts'
import { useUpsetWidgetValidator } from '../dialog/validator'
import UpdateWidgetDialog from '../dialog/upset-widget'
import WithLoader from './loading'
import ErrorBlock from './error'
import WidgetHeader from './header'
import { useWidgetStore } from '@/client/providers/widget-provider'
import WidgetNavigation from './navigation'
import { StyledWidgetMain } from '../../workspace.styled'

interface IWidget {
  workspaceId?: string
  id: string
  onRemove: () => void
}

const Widget: FC<IWidget> = (props) => {
  const { id, onRemove } = props

  const { widgetData, trigger, error } = useWidgetDataSWR(id)
  const [isWidgetDataValid, setIsWidgetDataValid] = useState(false)

  const [mode, setMode] = useState<ViewMode>(ViewMode.TABLE)

  // const { data: chartData } = useChartConfig({
  //   series: 2,
  //   dataType: 'time',
  // })

  const { metadata: providerMetadata, setMetadata, setSlots } = useWidgetStore()
  //setSlots(chartData)

  const [symbol, setSymbol] = useState(providerMetadata?.symbol)
  const [parserError, setParserError] = useState<ParserError>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isUpsetWidgetOpen, setIsUpsetWidgetOpen] = useState(false)
  const { register, handleSubmit, errors } = useUpsetWidgetValidator()

  const {
    onSubmit,
    serverError: updateWidgetServerError,
    data: updateWidgetResponse,
  } = useUpdateWidget()

  const {
    onSubmit: onSubmitDelete,
    serverError: deleteServerError,
    data: removeWidgetResponse,
  } = useDeleteWidget()

  const handleDeleteWidget = () => {
    const responseData = { id }
    setIsLoading(true)
    onSubmitDelete(responseData)
  }

  const showModal = () => {
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
    setIsWidgetDataValid(false)
    setIsUpsetWidgetOpen(false)
    setIsLoading(true)
    onSubmit(responseData)
  }

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
          setMetadata(metadata)
          setSymbol(metadata.symbol)
          setSlots(slots)
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
      setIsLoading(false)
    }

    if (deleteServerError) {
      console.log(deleteServerError)
      setIsLoading(false)
    }

    if (removeWidgetResponse) {
      console.log(removeWidgetResponse)
      onRemove()
    }
  }, [
    widgetData,
    setMetadata,
    setSlots,
    trigger,
    error,
    isWidgetDataValid,
    updateWidgetResponse,
    updateWidgetServerError,
    deleteServerError,
    removeWidgetResponse,
    onRemove,
  ])

  return (
    <>
      <StyledWidgetMain>
        <WidgetHeader
          title="Alpha-Vintage provider"
          onRemove={handleDeleteWidget}
        />
        <WidgetNavigation mode={mode} setMode={setMode} showModal={showModal} />
        {parserError ? (
          <ErrorBlock message={parserError.message} />
        ) : (
          <WithLoader isLoading={isLoading}>
            {mode === ViewMode.TABLE && <WidgetTable />}
            {mode === ViewMode.CHART && <WidgetCharts />}
          </WithLoader>
        )}
      </StyledWidgetMain>
      <UpdateWidgetDialog
        symbol={symbol}
        core={CoreStock[providerMetadata?.api_function?.toUpperCase()]}
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
