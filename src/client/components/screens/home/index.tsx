import { FC, useState } from 'react'

import Button from './neumorphic-button'

const categories = [
  { path: 'master', title: 'Master' },
  { path: 'infographics', title: 'Infographics' },
  { path: 'fundamentals', title: 'Fundamentals' },
]

const Home: FC = () => {
  const [currentCategory, setCurrentCategory] = useState('master')
  const selectCategory = (e: React.ChangeEvent<HTMLButtonElement>) => {
    setCurrentCategory(e.target.value)
  }

  return (
    <div>
      <h3 className="some">Home</h3>
      <ul className="flex flex-row">
        {categories.map((category, index) => (
          <li className="inline-flex" key={index}>
            <Button
              path={category.path}
              title={category.title}
              currentCategory={currentCategory}
              selectCategory={selectCategory}
            />
          </li>
        ))}
      </ul>
      <ul className="flex flex-row mt-20">
        <li>
          <button
            className="btn btn-lg 
          bg-primary border-primary text-primary-content
          dark:bg-primary-dark dark:border-primary-dark dark:text-primary-content-dark
          "
          >
            Primary
          </button>
          <button
            className="btn btn-lg 
          bg-secondary border-secondary text-secondary-content
          dark:bg-secondary-dark dark:border-secondary-dark dark:text-secondary-content-dark
          "
          >
            Primary
          </button>
        </li>
      </ul>

      <ul className="flex flex-row mt-20">
        <li>
          <button className="btn btn-lg">Neutral</button>
          <button
            className="btn 
          border-neutral dark:border-neutral-dark
          bg-neutral dark:bg-neutral-dark
          
          "
          >
            Neutral
          </button>
        </li>
      </ul>

      {/* <button
          className="mt-16 px-4 py-2 text-white dark:text-black bg-black dark:bg-white font-semibold rounded-md"
          onClick={() => {
            setTheme(theme === 'light' ? 'dark' : 'light')
          }}
        >
          Change Theme
      </button>

      <select data-choose-theme>
        <option value="daisy">Daisy</option>
        <option value="cmyk">CMYK</option>
      </select> */}
    </div>
  )
}

export default Home
