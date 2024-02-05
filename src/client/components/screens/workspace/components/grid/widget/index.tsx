import { FC } from 'react'
import Widget from '../../widget'

interface IWidget {
  workspaceId: string
  id: string
}

interface IWidgetListGrid {
  widgets: IWidget[]
  onWidgetRemove: () => void
  //onClick: (e: MouseEvent<HTMLButtonElement>) => void
}

const WidgetList: FC<IWidgetListGrid> = (props) => {
  const { widgets, onWidgetRemove } = props

  return (
    <div className="w-full flex flex-col items-center">
      {widgets?.map((item, i) => (
        <Widget key={i} id={item.id} onRemove={onWidgetRemove} />
      ))}
    </div>
  )
}
export default WidgetList
