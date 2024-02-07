import { FC, useEffect, useState } from 'react'
//import { ISlot } from '@/client/models/exchange.types'
import WidgetTableItem from './item'
import { useWidgetStore } from '@/client/providers/widget-provider'
import { ISlot } from '@/client/models/exchange/alpha-vintage.types'

interface IWidgetTable {
  //data: UserSerie<unknown>[]
}

const WidgetTable: FC<IWidgetTable> = () => {
  const { intervalSeies } = useWidgetStore()

  const [sliced, setSliced] = useState<ISlot[]>(null)

  useEffect(() => {
    if (!intervalSeies) return
    if (!intervalSeies[0]) return
    if (!intervalSeies[0].data) return
    setSliced(intervalSeies[0].data.slice(0, 24))
  }, [intervalSeies])

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
