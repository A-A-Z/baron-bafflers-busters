// import { useState, useMemo } from 'react'
import words from 'an-array-of-english-words'
import './assets/results.css'

import type { FC } from 'react'
import type { ResultsProps } from './types'

export const Results: FC<ResultsProps> = ({ values }) => {
  // loop over words and get all long.length words and short.length words
  // add all short words to Set
  // add all long words to array
  // loop over long words, break out the short part and check in short Set
  // store all matchs in object with a index of the short word
  const longLength = values.length

  if (values.length === 0) {
    return 'none'
  }

  const shortLength = values.filter(value => value).length

  if (shortLength < 2 || shortLength === longLength) {
    return 'error'
  }

  const fistShortIndex = values.findIndex(value => value)
  const lastShortIndex = values.findLastIndex(value => value)
  const shortWords = new Set<string>([])
  const matches: Record<string, Record<string, string[]>> = {}

  const longWords = words.filter(word => {
    if (word.length === shortLength) {
      shortWords.add(word)
      return false
    }
    return word.length === longLength
  })

  longWords.forEach(longWord => {
    const subWord = longWord.substring(fistShortIndex, lastShortIndex + 1)
    if (!shortWords.has(subWord)) return
    const letter = subWord[0]
    if (matches[letter] === undefined) {
      matches[letter] = {}
    }
    if (matches[letter][subWord] === undefined) {
      matches[letter][subWord] = []
    }
    matches[letter][subWord].push(longWord)
  })

  const entries = Object.entries(matches)

  if (entries.length === 0) {
    // I don't think this can happen
    return <p>No result?</p>
  }
  
  return (
    <section aria-labelledby="results-title" className="results">
      <h2 id="results-title">Results</h2>
      <ul className="results__list">
      {entries
        .toSorted()
        .map(([letter, item]) => (
          <li className="results__entry">
            <h3 className="results__letter">{letter}</h3>
            <ul className="results__words">
              {Object.entries(item).map(([short, longList]) => (
                <li className="results__word">
                  {short} <span className="results__count">({longList.length})</span>
                </li>
              ))}
            </ul>
          </li>
        ))
      }
      </ul>
    </section>
  )
}
