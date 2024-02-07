import { useWidgetStore } from '@/client/providers/widget-provider'
import { ChangeEvent, FC, useEffect } from 'react'
import { spliceIntervalSeries } from '@/client/services/parser/alpha-vintage'
import {
  StyledDatePickerInput,
  StyledDatePickerLabel,
} from '../../../workspace.styled'

interface IIntervalPicker {}

const IntervalPicker: FC<IIntervalPicker> = () => {
  const { startDate, endDate, setInterval, series, setIntervalSeries } =
    useWidgetStore()

  const onStartDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const newStartDate = new Date(e.target.value)
    endDate < newStartDate
      ? setInterval(newStartDate, newStartDate)
      : setInterval(newStartDate, endDate)
  }

  const onEndDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const newEndDate = new Date(e.target.value)
    startDate > newEndDate
      ? setInterval(newEndDate, newEndDate)
      : setInterval(startDate, newEndDate)
  }

  useEffect(() => {
    const intervalSeries = spliceIntervalSeries(series, startDate, endDate)
    if (!intervalSeries) return
    setIntervalSeries(intervalSeries)
  }, [startDate, endDate, series, setIntervalSeries])

  return (
    <div className="flex flex-row pr-4 gap-2">
      <StyledDatePickerLabel>from:</StyledDatePickerLabel>
      <StyledDatePickerInput
        type="date"
        value={
          startDate && startDate.toISOString
            ? startDate.toISOString().split('T')[0]
            : new Date('August 19, 1911 23:15:30').toISOString().split('T')[0]
        }
        onChange={onStartDateChange}
      />
      <StyledDatePickerLabel>to:</StyledDatePickerLabel>
      <StyledDatePickerInput
        type="date"
        value={
          endDate && endDate.toISOString
            ? endDate.toISOString().split('T')[0]
            : new Date().toISOString().split('T')[0]
        }
        onChange={onEndDateChange}
      />
    </div>
  )
}
export default IntervalPicker
