import { useState, useEffect } from 'react'
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
  const [selectedWord, setSelectedWord] = useState<string | null>(null)
  const longLength = values.length

  useEffect(() => {
    setSelectedWord(null)
  }, [values])

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
                <li key={short} className="results__word">
                  <button type="button" className="results__select-btn" onClick={() => { setSelectedWord(short) }}>
                    {short} <span className="results__count">({longList.length})</span>
                  </button>
                </li>
              ))}
            </ul>
          </li>
        ))
      }
      </ul>
      {selectedWord !== null &&
        <div className="selected">
          <h2 className="selected__title">{selectedWord}</h2>
          <ul className="selected__list">
            {matches[selectedWord[0]][selectedWord].map((long) => (
              <li key={long} className="selected__item">{long}</li>
            ))}
          </ul>
        </div>
      }
    </section>
  )
}
