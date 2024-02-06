import { FC } from 'react'

interface IIntervalPicker {}

const IntervalPicker: FC<IIntervalPicker> = () => {
  return (
    <div className="flex flex-row pr-4 gap-2">
      <label className="pt-1 label-text text-end dark:text-primary-dark/70">
        from:
      </label>
      <input
        type="date"
        value="2017-06-01"
        className="input-sm rounded-md dark:bg-base-100-dark dark:text-primary-dark"
      />
      <label className="pt-1 label-text text-end dark:text-primary-dark/70">
        to:
      </label>
      <input
        type="date"
        value="2017-06-01"
        className="input-sm rounded-md dark:bg-base-100-dark dark:text-primary-dark"
      />
    </div>
  )
}
export default IntervalPicker
