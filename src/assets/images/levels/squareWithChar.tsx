/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { ComponentProps, memo } from "react"

export function squareWithChar(props: ComponentProps<"svg">) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 163 163" {...props}>
      <rect x="81.3173" y="5.65685" width="107" height="107" rx="4" transform="rotate(45 81.3173 5.65685)" className="fill-color-2 stroke-color-1" strokeWidth="10" />
      <path d="M82.1206 122.013C82.521 122.518 83.2867 122.518 83.687 122.013L91.1426 112.622C91.6629 111.966 91.1962 111 90.3594 111H75.4482C74.6114 111 74.1447 111.966 74.665 112.622L82.1206 122.013Z" className="fill-color-1" />
    </svg>
  )
}

export default memo(squareWithChar)
