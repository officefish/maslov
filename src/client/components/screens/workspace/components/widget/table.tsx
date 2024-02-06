import { FC, useEffect, useState } from 'react'
//import { ISlot } from '@/client/models/exchange.types'
import WidgetTableItem from './item'
import { ISlot } from '@/client/models/exchange/types'
import { useWidgetStore } from '@/client/providers/widget-provider'

interface IWidgetTable {
  //data: UserSerie<unknown>[]
}

const WidgetTable: FC<IWidgetTable> = () => {
  const { slots } = useWidgetStore()

  const [sliced, setSliced] = useState<ISlot[]>(null)

  useEffect(() => {
    if (!slots) return
    if (!slots[0]) return
    if (!slots[0].data) return
    setSliced(slots[0].data.slice(0, 24))
  }, [slots])

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
