export type RunFn = (value: boolean[], longHasLetters: string, shortHasLetters: string) => void

export interface FormProps {
  run: RunFn
}

export interface ResultsProps {
  values: boolean[]
  longHasLetters: string
  shortHasLetters: string
}
