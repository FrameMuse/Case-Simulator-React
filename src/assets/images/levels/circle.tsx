/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { ComponentProps, memo } from "react"

export function circle(props: ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg" {...props}>
      {props.children}
      <circle cx="70" cy="70" r="65" className="fill-color-2 stroke-color-1" strokeWidth="10" />
    </svg>
  )
}

export default memo(circle)
