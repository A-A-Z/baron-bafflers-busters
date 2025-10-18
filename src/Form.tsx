import { useState } from 'react'
import { DEFAULT_VALUE } from './constants'

import type { FC, ChangeEventHandler } from 'react'

export const Form: FC = () => {
  const [values, setValues] = useState<boolean[]>(DEFAULT_VALUE)

  const hasSelected = values.some(value => value)

  const onCheck: ChangeEventHandler<HTMLInputElement> = event => {
    const index = Number(event.currentTarget.value)
    setValues(current => {
      const newValues = [...current]
      newValues[index] = !current[index]
      return newValues
    })
  }

  return (
    <section aria-labelledby="form-title">
      <h2 id="form-title">Form</h2>

      <form>
        <fieldset>
          <legend>Letters</legend>
          <ul aria-label="letters">
            {values.map((isShort, index) => {
              const inputId = `letter-${index}`

              // Can this cell be selected?
              const isValidSection = !values[index]
                // if selected then at least neighbour must be unselected
                ? values[index + 1] || values[index - 1]
                // if unselected then at least neighbour must be selected
                : !values[index + 1] || !values[index - 1]

              return (
                <li key={index}>
                  <label htmlFor={inputId}>Letter {index + 1}</label>
                  <input
                    id={inputId}
                    type="checkbox"
                    value={index}
                    checked={isShort}
                    onChange={onCheck}
                    disabled={hasSelected && !isValidSection}
                  />
                </li>
              )
            })}
          </ul>
        </fieldset>

        <button type="button">add</button>
        <button type="button">remove</button>

        <button type="submit">Run</button>
      </form>
    </section>
  )
}
