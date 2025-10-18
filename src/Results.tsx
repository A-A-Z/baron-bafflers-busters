import type { FC } from 'react'

export const Results: FC = () => {
  // loop over words and get all long.length words and short.length words
  // add all short words to Set
  // add all long words to array
  // loop over long words, break out the short part and check in short Set
  // store all matchs in object with a index of the short word
  return (
    <section aria-labelledby="results-title">
      <h2 id="results-title">Results</h2>
    </section>
  )
}
