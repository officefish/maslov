import { FC } from 'react'
import Widget from '../../widget'

interface IWidget {
  workspaceId: string
  id: string
}

interface IWidgetListGrid {
  widgets: IWidget[]
  //onClick: (e: MouseEvent<HTMLButtonElement>) => void
}

const WidgetList: FC<IWidgetListGrid> = (props) => {
  const { widgets } = props

  return (
    <div className="w-full flex flex-col">
      {widgets?.map((item, i) => <Widget key={i} id={item.id} />)}
    </div>
  )
}
export default WidgetList
