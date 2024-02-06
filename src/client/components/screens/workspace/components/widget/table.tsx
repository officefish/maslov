import { FC, useEffect, useState } from 'react'
//import { ISlot } from '@/client/models/exchange.types'
import WidgetTableItem from './item'
import { useWidgetStore } from '@/client/providers/widget-provider'
import { ISlot } from '@/client/models/exchange/alpha-vintage.types'

interface IWidgetTable {
  //data: UserSerie<unknown>[]
}

const WidgetTable: FC<IWidgetTable> = () => {
  const { series } = useWidgetStore()

  const [sliced, setSliced] = useState<ISlot[]>(null)

  useEffect(() => {
    if (!series) return
    if (!series[0]) return
    if (!series[0].data) return
    setSliced(series[0].data.slice(0, 24))
  }, [series])

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
