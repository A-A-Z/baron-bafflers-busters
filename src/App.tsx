// import { useState } from 'react'
import { Header } from './Header'
import { Form } from './Form'
import { Results } from './Results'
import './assets/root.css'
import './assets/theme.css'
import './assets/app.css'

import type { FC } from 'react'

const App: FC = () => {
  return (
    <>
      <Header />
      <main>
        <Form />
        <Results />
      </main>
    </>
  )
}

export default App
