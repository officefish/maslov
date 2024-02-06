import { FC } from 'react'
import Widget from '../../widget'
import { WidgetProvider } from '@/client/providers/widget-provider'

interface IWidget {
  workspaceId: string
  id: string
}

interface IWidgetListGrid {
  widgets: IWidget[]
  onWidgetRemove: () => void
}

const WidgetList: FC<IWidgetListGrid> = (props) => {
  const { widgets, onWidgetRemove } = props

  return (
    <div className="w-full flex flex-col items-center">
      {widgets?.map((item, i) => (
        <WidgetProvider key={i}>
          <Widget id={item.id} onRemove={onWidgetRemove} />
        </WidgetProvider>
      ))}
    </div>
  )
}
export default WidgetList
