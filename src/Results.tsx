// import { useState, useMemo } from 'react'
import type { FC } from 'react'
import type { ResultsProps } from './types'

export const Results: FC<ResultsProps> = ({ values }) => {
  // loop over words and get all long.length words and short.length words
  // add all short words to Set
  // add all long words to array
  // loop over long words, break out the short part and check in short Set
  // store all matchs in object with a index of the short wor

  const longLength = values.length
  const shortLength = values.filter(value => value).length
  const fistShortIndex = values.findIndex(value => value)
  const lastShortIndex = values.findLastIndex(value => value)

  console.log('render', { longLength, shortLength, fistShortIndex, lastShortIndex })
  return (
    <section aria-labelledby="results-title">
      <h2 id="results-title">Results</h2>
      {values.length}
    </section>
  )
}
