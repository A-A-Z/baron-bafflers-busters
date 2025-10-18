import { useState } from 'react'
import { DEFAULT_VALUE } from './constants'

import type {
  FC,
  ChangeEventHandler,
  FormEventHandler,
  KeyboardEvent
} from 'react'

export const Form: FC = () => {
  const [values, setValues] = useState<boolean[]>(DEFAULT_VALUE)

  const hasSelected = values.some(value => value)

  const toggleValue = (index: number) => {
    setValues(current => {
      const newValues = [...current]
      newValues[index] = !current[index]
      return newValues
    })
  }

  // Can this cell be selected?
  const isValidSection = (index: number) => hasSelected && !values[index]
    // if selected then at least neighbour must be unselected
    ? values[index + 1] || values[index - 1]
    // if unselected then at least neighbour must be selected
    : !values[index + 1] || !values[index - 1]

  const onCheck: ChangeEventHandler<HTMLInputElement> = event => {
    const index = Number(event.currentTarget.value)
    toggleValue(index)
  }

  const onLabelKeydown = ({ key }: KeyboardEvent<HTMLLabelElement>, index: number) => {
    if (isValidSection(index) && (key === 'Enter' || key === ' ')) {
      toggleValue(index)
    }
  }

  const addLetter = () => {
    setValues([...values, false])
  }

  const removeLetter = () => {
    setValues(values.slice(0, values.length - 1))
  }

  const onSubmit: FormEventHandler<HTMLFormElement> = () => {
    console.log({ values })
  }

  return (
    <section aria-labelledby="form-title">
      <h2 id="form-title">Form</h2>

      <form onSubmit={onSubmit}>
        <fieldset>
          <legend>Letters</legend>
          <ul aria-label="letters">
            {values.map((isShort, index) => {
              const inputId = `letter-${index}`
              return (
                <li key={index}>
                  <label
                    htmlFor={inputId}
                    onKeyDown={event => onLabelKeydown(event, index)}
                    tabIndex={0}
                  >
                    Letter {index + 1}
                  </label>
                  <input
                    id={inputId}
                    type="checkbox"
                    value={index}
                    checked={isShort}
                    onChange={onCheck}
                    disabled={!isValidSection(index)}
                    tabIndex={-1}
                  />
                </li>
              )
            })}
          </ul>
        </fieldset>

        <button
          type="button"
          onClick={addLetter}
          disabled={values.length > 8}
        >
          add
        </button>
        <button
          type="button"
          onClick={removeLetter}
          disabled={values.length < 4}
        >remove</button>

        <button type="submit">
          Run
        </button>
      </form>
    </section>
  )
}
