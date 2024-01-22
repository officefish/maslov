import { FC, MouseEvent } from 'react'
import { UserMin } from '@client/models/user.model'

import Image from 'next/image'

import { NavigationButton, StyledUserName } from './styled-header'

import { useRouter } from 'next/router'

const UserItem: FC<UserMin> = ({ name, avatar }) => {
  const router = useRouter()
  const href = '/me'

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    router.push(href)
  }

  return (
    <NavigationButton onClick={handleClick}>
      <div className="avatar">
        <div className="w-6 mask mask-squircle">
          {avatar && (
            <Image
              alt="avatar"
              src={avatar}
              width={24}
              height={24}
              className="w-6 mask mask-squircle"
            />
          )}
        </div>
      </div>
      <StyledUserName>{name}</StyledUserName>
    </NavigationButton>
  )
}

//<Link className='ml-5 mr-2 hover:text-cyan-500 cursor-pointer text-lg whitespace-nowrap' href='/me'>{name}.</Link>

export default UserItem
