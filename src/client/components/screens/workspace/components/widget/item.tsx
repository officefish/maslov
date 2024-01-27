import { FC } from 'react'

interface IWidgetTableItem {
  data: any
}

const WidgetTableItem: FC<IWidgetTableItem> = (props) => {
  const { data } = props
  //const entries = Object.entries(props)
  console.log(data)
  return <div></div>
}
export default WidgetTableItem
