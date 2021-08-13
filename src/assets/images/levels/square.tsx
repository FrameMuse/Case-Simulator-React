/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { ComponentProps, memo } from "react"

export function square(props: ComponentProps<"svg">) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 163 163" {...props}>
      <rect x="81.3173" y="5.65685" width="107" height="107" rx="4" transform="rotate(45 81.3173 5.65685)" className="fill-color-2 stroke-color-1" strokeWidth="10" />
    </svg>
  )
}

export default memo(square)
