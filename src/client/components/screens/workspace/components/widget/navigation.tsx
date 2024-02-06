//import { ISlot } from '@/client/models/exchange/types'
import { FC, MouseEvent } from 'react'
import { faChartSimple } from '@fortawesome/free-solid-svg-icons'

import WidgetTabs from './tabs'
import { StyledButtonWidget } from '../../workspace.styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useWidgetStore } from '@/client/providers/widget-provider'
import { ViewMode } from './types'
import IntervalPicker from './interval/picker'

interface IWidgetNavigation {
  mode: ViewMode
  setMode: (mode: ViewMode) => void
  showModal: () => void
}

const WidgetNavigation: FC<IWidgetNavigation> = (props) => {
  const { mode, setMode, showModal } = props
  const { metadata } = useWidgetStore()

  const handleShowModal = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    showModal()
  }

  return (
    <div className="flex flex-row justify-between w-full h-16 items-center">
      <div>
        <StyledButtonWidget onClick={handleShowModal}>
          <FontAwesomeIcon icon={faChartSimple} />
          {metadata ? (
            <span>
              {metadata.symbol} | {metadata.api_function}
            </span>
          ) : (
            <>unknown</>
          )}
        </StyledButtonWidget>
      </div>
      <div className="flex flex-row h-full items-center">
        <IntervalPicker />
        <WidgetTabs mode={mode} setMode={setMode} />
      </div>
    </div>
  )
}
export default WidgetNavigation
