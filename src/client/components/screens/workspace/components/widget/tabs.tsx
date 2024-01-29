import { FC } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChartPie,
  faTable,
  faSquareRootVariable,
} from '@fortawesome/free-solid-svg-icons'

import { ViewMode } from './types'
import { WidgetTab } from '../../workspace.styled'

interface IWidgetTabs {
  mode: ViewMode
  setMode: (mode: ViewMode) => void
}

const WidgetTabs: FC<IWidgetTabs> = (props) => {
  const { mode, setMode } = props

  const onFunctionClick = () => setMode(ViewMode.FUNCTION)
  const onChartClick = () => setMode(ViewMode.CHART)
  const onTableClick = () => setMode(ViewMode.TABLE)

  return (
    <div role="tablist" className="tabs tabs-boxed">
      <WidgetTab
        $active={mode === ViewMode.FUNCTION}
        role="tab"
        onClick={onFunctionClick}
      >
        <FontAwesomeIcon icon={faSquareRootVariable} />
      </WidgetTab>
      <WidgetTab
        $active={mode === ViewMode.CHART}
        role="tab"
        onClick={onChartClick}
      >
        <FontAwesomeIcon icon={faChartPie} />
      </WidgetTab>
      <WidgetTab
        $active={mode === ViewMode.TABLE}
        role="tab"
        onClick={onTableClick}
      >
        <FontAwesomeIcon icon={faTable} />
      </WidgetTab>
    </div>
  )
}
export default WidgetTabs
