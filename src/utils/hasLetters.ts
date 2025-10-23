export const hasLetters = (
  word: string,
  letters: string,
): boolean => {
  // Build frequency map for characters in the word
  const counts = new Map<string, number>()
  for (const ch of word) counts.set(ch, (counts.get(ch) ?? 0) + 1)

  // Consume letters fail if any required char is missing/insufficient
  for (const ch of letters) {
    const n = counts.get(ch) ?? 0
    if (n === 0) return false
    counts.set(ch, n - 1)
  }

  return true
}
