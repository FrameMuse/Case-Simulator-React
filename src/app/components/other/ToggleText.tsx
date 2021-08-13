/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { useState } from "react"

export default function ToggleText<T = any>({ className, first, last }: { className?: string; first: T; last: T }) {
  const [state, setState] = useState(first)
  const toggle = () => setState(state === first ? last : first)

  return (
    <span className={className} onClick={toggle}>{state}</span>
  )
}
