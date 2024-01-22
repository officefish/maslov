import { FC, MouseEvent } from 'react'
import { useRouter } from 'next/router'

import { faGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  StyledFunctional,
  SettingsButton,
  NewPostButton,
} from '../../styled-profile'

const HeaderFunctional: FC = () => {
  const router = useRouter()

  const newPostClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    router.push('/post/new/edit')
  }

  const settingsClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    router.push('/me/settings')
  }

  return (
    <StyledFunctional>
      <NewPostButton type="button" onClick={newPostClick}>
        New Post
      </NewPostButton>
      <SettingsButton
        $active={true}
        disabled={false}
        type="button"
        onClick={settingsClick}
      >
        Settings
        <FontAwesomeIcon icon={faGear} />
      </SettingsButton>
    </StyledFunctional>
  )
}
export default HeaderFunctional
