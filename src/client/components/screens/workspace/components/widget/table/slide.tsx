import { FC } from 'react'
import WidgetTableItem from './item'
import { ISlot, ISlide } from '@/client/models/exchange/alpha-vintage.types'

interface IWidgetTableItem {
  data: ISlide
}

const WidgetTableSlide: FC<IWidgetTableItem> = (props) => {
  const { data } = props

  console.log(data)

  return (
    <div className="w-full flex justify-center overflow-x-auto">
      <table className="table table-zebra table-xs text-base-content dark:text-base-content-dark">
        <thead className="">
          <tr>
            <th>Date</th>
            <th>Open</th>
            <th>Close</th>
            <th>High</th>
            <th>Low</th>
          </tr>
        </thead>
        <tbody>
          {data?.slots?.map((item: ISlot, i) => (
            <WidgetTableItem key={i} data={item} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default WidgetTableSlide
