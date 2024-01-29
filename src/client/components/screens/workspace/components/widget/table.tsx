import { FC } from 'react'
import { ISlot } from '@/client/models/exchange.types'
import WidgetTableItem from './item'

interface IWidgetTable {
  data: ISlot[]
}

const WidgetTable: FC<IWidgetTable> = (props) => {
  const { data } = props

  return (
    <div className="overflow-x-auto pt-4">
      <table className="table table-zebra table-md text-base-content dark:text-base-content-dark">
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
          {data?.map((item, i) => <WidgetTableItem key={i} data={item} />)}
        </tbody>
      </table>
    </div>
  )
}
export default WidgetTable
