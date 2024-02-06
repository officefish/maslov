//import { ISlot } from '@/client/models/exchange/types'
import { FC, MouseEvent } from 'react'
import { faChartSimple } from '@fortawesome/free-solid-svg-icons'

import WidgetTabs from './tabs'
import { StyledButtonWidget } from '../../workspace.styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useWidgetStore } from '@/client/providers/widget-provider'
import { ViewMode } from './types'

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
      <WidgetTabs mode={mode} setMode={setMode} />
    </div>
  )
}
export default WidgetNavigation
