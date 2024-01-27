import { FC } from 'react'

interface IWidget {
  workspaceId?: string
  id: string
}

const Widget: FC<IWidget> = (props) => {
  const { id } = props

  return <div>{id}</div>
}
export default Widget
