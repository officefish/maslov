import { ISlot } from '@/client/models/exchange/types'
import { FC } from 'react'

interface IWidgetTableItem {
  data: ISlot
}

const WidgetTableItem: FC<IWidgetTableItem> = (props) => {
  const { data } = props
  //const entries = Object.entries(props)
  return (
    <tr>
      <th>{data?.date?.toDateString()}</th>
      <td>{data?.open}</td>
      <td>{data?.close}</td>
      <td>{data?.high}</td>
      <td>{data?.low}</td>
    </tr>
  )
}
export default WidgetTableItem
