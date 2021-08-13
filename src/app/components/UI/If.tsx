/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/


interface IfProps {
  state?: boolean
  children: any
}

export default function If({ state, children }: IfProps) {
  return Boolean(state) && children
}
