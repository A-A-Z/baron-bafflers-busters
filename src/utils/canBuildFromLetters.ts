/**
 * Returns true if `word` can be built from characters in `pool`.
 * Case-sensitive by default.
 */
export function canBuildFromLetters(
  word: string,
  pool: string
): boolean {
  // Count available chars in the pool
  const counts = new Map<string, number>()
  for (const ch of pool) counts.set(ch, (counts.get(ch) ?? 0) + 1)

  // Consume counts for each char in the word
  for (const ch of word) {
    const n = counts.get(ch) ?? 0
    if (n === 0) return false
    counts.set(ch, n - 1)
  }

  return true
}
