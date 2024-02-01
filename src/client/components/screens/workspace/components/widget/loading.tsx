import { FC, PropsWithChildren } from 'react'

interface IWithLoader extends PropsWithChildren {
  isLoading: boolean
}

const WithLoader: FC<IWithLoader> = ({ children, isLoading }) => {
  return (
    <>
      {isLoading ? (
        <div className="w-full h-96 outline-none border-2 rounded flex items-center justify-center border-accent dark:border-accent-dark">
          <span className="loading loading-ring text-accent dark:text-accent-dark loading-lg"></span>
        </div>
      ) : (
        <>{children}</>
      )}
      )
    </>
  )
}
export default WithLoader
