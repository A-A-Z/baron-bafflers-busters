export type RunFn = (value: boolean[]) => void

export interface FormProps {
  run: RunFn
}

export interface ResultsProps {
  values: boolean[]
}
