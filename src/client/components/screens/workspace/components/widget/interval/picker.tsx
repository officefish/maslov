import { useWidgetStore } from '@/client/providers/widget-provider'
import { ChangeEvent, FC } from 'react'

interface IIntervalPicker {}

const IntervalPicker: FC<IIntervalPicker> = () => {
  const { startDate, endDate, setInterval } = useWidgetStore()

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
  return (
    <div className="flex flex-row pr-4 gap-2">
      <label className="pt-1 label-text text-end dark:text-primary-dark/70">
        from:
      </label>
      <input
        type="date"
        value={startDate.toISOString().split('T')[0]}
        className="input-sm rounded-md dark:bg-base-100-dark dark:text-primary-dark"
        onChange={onStartDateChange}
      />
      <label className="pt-1 label-text text-end dark:text-primary-dark/70">
        to:
      </label>
      <input
        type="date"
        value={endDate.toISOString().split('T')[0]}
        className="input-sm rounded-md dark:bg-base-100-dark dark:text-primary-dark"
        onChange={onEndDateChange}
      />
    </div>
  )
}
export default IntervalPicker
