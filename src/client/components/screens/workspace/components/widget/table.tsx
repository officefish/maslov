import { FC } from 'react'
//import { ISlot } from '@/client/models/exchange.types'
import WidgetTableItem from './item'
import { UserSerie } from 'react-charts'
import { ISlot } from '@/client/models/exchange.types'

interface IWidgetTable {
  data: UserSerie<unknown>[]
}
const WidgetTable: FC<IWidgetTable> = (props) => {
  const { data } = props

  const sliced = data[0].data.slice(0, 24)

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
          {sliced?.map((item: ISlot, i) => (
            <WidgetTableItem key={i} data={item} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default WidgetTable
