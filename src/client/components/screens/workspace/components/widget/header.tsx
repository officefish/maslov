import { FC, MouseEvent } from 'react'

import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface IWidgetHeader {
  title: string
  onRemove: () => void
}

const WidgetHeader: FC<IWidgetHeader> = ({ title, onRemove }) => {
  const handleClick = (e: MouseEvent) => {
    e.preventDefault()
    onRemove()
  }

  return (
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
  )
}
export default WidgetHeader
