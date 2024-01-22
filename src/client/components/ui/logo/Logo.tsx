import { FC, MouseEvent } from 'react'

import styles from './Logo.module.css'
import { useRouter } from 'next/router'

const Logo: FC = () => {
  const router = useRouter()
  const href = '/'

  const handleClick = (e: MouseEvent) => {
    e.preventDefault()
    router.push(href)
  }

  return (
    <section
      onClick={handleClick}
      className={`${styles.logo_wrapper} ${styles.sliced_wrapper}`}
    >
      <div className={`${styles.logo_top} ${styles.sliced_top}`}>Techies.</div>
      <div
        className={`${styles.logo_bottom} ${styles.sliced_bottom}`}
        aria-hidden="true"
      >
        Techies.
      </div>
    </section>
  )
}

export default Logo
