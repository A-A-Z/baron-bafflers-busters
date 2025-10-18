import type { FC } from 'react'

export const Form: FC = () => {
  return (
    <section aria-labelledby="form-title">
      <h2 id="form-title">Form</h2>

      <form>
        <div role="group">
          <ul aria-label="letters">
            <li>
              <label htmlFor="letter-1">Letter 1</label>
              <input id="letter-1" type="text" max={1} />
              <label htmlFor="type-1">type</label>
              <input id="type-1" type="checkbox" />
            </li>
          </ul>
          <button type="button">add</button>
          <button type="button">remove</button>
        </div>

        <button type="submit">Run</button>
      </form>
    </section>
  )
}
