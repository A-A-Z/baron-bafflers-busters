import { useState } from 'react'
import { Header } from './Header'
import { Form } from './Form'
import { Results } from './Results'
import './assets/root.css'
import './assets/theme.css'
import './assets/app.css'

import type { FC } from 'react'

const App: FC = () => {
  const [values, setValues] = useState<boolean[]>([])

  return (
    <>
      <Header />
      <main>
        <Form run={setValues} />
        <Results values={values} />
      </main>
    </>
  )
}

export default App
