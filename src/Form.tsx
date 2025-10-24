import { useState } from 'react'
import { DEFAULT_VALUE } from './constants'
import './assets/form.css'

import type {
  FC,
  ChangeEventHandler,
  FormEventHandler,
  KeyboardEvent
} from 'react'
import type { FormProps } from './types'

export const Form: FC<FormProps> = ({ run }) => {
  const [values, setValues] = useState<boolean[]>(DEFAULT_VALUE)
  const [longHasLetters, setLongHasLetters] = useState('')
  const [shortHasLetters, setShortHasLetters] = useState('')

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

  const resetLetters = () => {
    setValues(DEFAULT_VALUE)
    setLongHasLetters('')
    setShortHasLetters('')
    run([], '', '')
  }

  const onLongLettersChange: ChangeEventHandler<HTMLInputElement> = event => {
    setLongHasLetters(event.currentTarget.value)
  }

  const onShortLettersChange: ChangeEventHandler<HTMLInputElement> = event => {
    setShortHasLetters(event.currentTarget.value)
  }

  const onSubmit: FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault()
    run(values, longHasLetters, shortHasLetters)
  }

  return (
    <section aria-labelledby="form-title">
      <h2 id="form-title" className="visually-hidden">Form</h2>

      <form className="form" onSubmit={onSubmit}>
        <fieldset>
          <legend className="visually-hidden">Letters</legend>
          <ul className="form__letters" aria-label="letters">
            {values.map((isShort, index) => (
                <li key={index}>
                  <label
                    className="form__letter"
                    onKeyDown={event => onLabelKeydown(event, index)}
                    tabIndex={0}
                  >
                    <span className="visually-hidden">Letter {index + 1}</span>
                    <input
                      className="visually-hidden"
                      type="checkbox"
                      value={index}
                      checked={isShort}
                      onChange={onCheck}
                      disabled={!isValidSection(index)}
                      tabIndex={-1}
                    />
                  </label>
                </li>
              )
            )}
            <li className="form__controls">
              <button
                type="button"
                className="btn"
                onClick={addLetter}
                disabled={values.length > 8}
              >
                Add
              </button>
              <button
                type="button"
                className="btn"
                onClick={removeLetter}
                disabled={values.length < 4}
              >Remove</button>
              <button
                type="button"
                className="btn"
                onClick={resetLetters}
              >Reset</button>
            </li>
          </ul>
        </fieldset>

        <div className="from__fields">
          <div className="form__field">
            <label htmlFor="long-has-letters" className="form__label">
              Long word must have the following letters:
            </label>
            <input
              id="long-has-letters"
              className="form__input"
              type="text"
              name="longHasLetters"
              value={longHasLetters}
              onChange={onLongLettersChange}
              placeholder="None"
            />
          </div>

          <div className="form__field">
            <label htmlFor="short-has-letters" className="form__label">
              Short word must be made of some of these letters:
            </label>
            <input
              id="short-has-letters"
              className="form__input"
              type="text"
              name="shortHasLetters"
              value={shortHasLetters}
              onChange={onShortLettersChange}
              placeholder="None"
            />
          </div>
        </div>

        <button type="submit" className="btn form__run">
          Run
        </button>
      </form>
    </section>
  )
}
