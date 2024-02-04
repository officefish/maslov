import { FC, MouseEvent, useState } from 'react'

import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import RemoveWidgetDialog from '../dialog/remove-widget'

interface IWidgetHeader {
  title: string
  onRemove: () => void
}

const WidgetHeader: FC<IWidgetHeader> = ({ title, onRemove }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = (e: MouseEvent) => {
    e.preventDefault()
    setIsOpen(true)
  }

  const handleConfirmRemove = () => {
    setIsOpen(false)
    onRemove()
  }

  return (
    <>
      <div className="w-full justify-end text-sm text-info/50 dark:text-info-dark/50 flex flex-row gap-4">
        {title}
        <button
          className="btn btn-xs btn-outline btn-info opacity-50 hover:opacity-100 btn-ghost"
          onClick={handleClick}
        >
          <FontAwesomeIcon icon={faTrash} />
          <span className="pl-2">remove widget</span>
        </button>
      </div>
      <RemoveWidgetDialog
        title="remove widget"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onRemove={handleConfirmRemove}
      />
    </>
  )
}
export default WidgetHeader
