import { useState, useEffect } from 'react'
import words from 'an-array-of-english-words'
import { hasLetters } from './utils/hasLetters'
import { canBuildFromLetters } from './utils/canBuildFromLetters'
import './assets/results.css'

import type { FC } from 'react'
import type { ResultsProps } from './types'

export const Results: FC<ResultsProps> = ({ values, longHasLetters, shortHasLetters }) => {
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

  // fingers crossed that React Compiler is taking care of all thing
  const longWords = words.filter(word => {
    // if word is shortLength then cache it to the shortWords cache and return
    if (word.length === shortLength && (shortHasLetters.length === 0 || canBuildFromLetters(word, shortHasLetters))) {
      shortWords.add(word)
      // return false
    }

    // if word is not the correct length then reject it
    if (word.length !== longLength) return false

    // if longHasLetters is set then make sure they match, otherwise just add it
    return longHasLetters.length === 0 ? true : hasLetters(word, longHasLetters)
  })

  longWords.forEach(longWord => {
    // get the "short word" within the long word
    const subWord = longWord.substring(fistShortIndex, lastShortIndex + 1)

    // check the cache of short words for a match
    if (!shortWords.has(subWord)) return

    const letter = subWord[0]

    // if new letter then create an entry for it
    if (matches[letter] === undefined) matches[letter] = {}
    
    // if a new short word then create an entry for it
    if (matches[letter][subWord] === undefined) matches[letter][subWord] = []
    
    // add long word to short word's list of matches
    matches[letter][subWord].push(longWord)
  })

  const entries = Object.entries(matches)

  if (entries.length === 0) {
    return <p>No result</p>
  }
  
  return (
    <section aria-labelledby="results-title" className="results">
      <h2 id="results-title">Results</h2>
      <ul className="results__list">
      {entries
        .toSorted()
        .map(([letter, item]) => (
          <li key={letter} className="results__entry">
            <h3 className="results__letter">{letter}</h3>
            <ul className="results__words">
              {Object.entries(item)
                .toSorted()
                .map(([short, longList]) => (
                  <li key={short} className="results__word">
                    <button type="button" className="results__select-btn" onClick={() => { setSelectedWord(short) }}>
                      {short} <span className="results__count">({longList.length})</span>
                    </button>
                  </li>
                ))
              }
            </ul>
          </li>
        ))
      }
      </ul>
      {selectedWord !== null &&
        <div className="selected">
          <h2 className="selected__title">{selectedWord}</h2>
          <ul className="selected__list">
            {matches[selectedWord[0]][selectedWord].map(long => (
              <li key={long} className="selected__item">{long}</li>
            ))}
          </ul>
        </div>
      }
    </section>
  )
}
