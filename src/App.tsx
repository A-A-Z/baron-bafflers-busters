import { useState } from 'react'
import { Header } from './Header'
import { Form } from './Form'
import { Results } from './Results'
import './assets/root.css'
import './assets/theme.css'
import './assets/app.css'

import type { FC } from 'react'
import type { RunFn } from './types'

const App: FC = () => {
  const [values, setValues] = useState<boolean[]>([])
  const [longHasLetters, setLongHasLetters] = useState('')
  const [shortHasLetters, setShortHasLetters] = useState('')

  const onRun: RunFn = (newValues, newLongLetter, newShortLetters) => {
    setValues(newValues)
    setLongHasLetters(newLongLetter)
    setShortHasLetters(newShortLetters)
  }

  return (
    <>
      <Header />
      <main>
        <Form run={onRun} />
        <Results
          values={values}
          longHasLetters={longHasLetters}
          shortHasLetters={shortHasLetters}
        />
      </main>
    </>
  )
}

export default App
