// import { useState } from 'react'
import { Form } from './Form'
import { Results } from './Results'
import './assets/root.css'
import './assets/app.css'

import type { FC } from 'react'

const App: FC = () => {
  return (
    <>
      <header>
        <h1>Baron's Bafflers Busters</h1>
      </header>
      <main>
        <Form />
        <Results />
      </main>
    </>
  )
}

export default App
