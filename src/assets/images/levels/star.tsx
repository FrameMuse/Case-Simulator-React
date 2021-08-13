/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { ComponentProps, memo } from "react"

export function star(props: ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 173 173" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M71.3328 59.6241L86.5 12.9443L101.667 59.6241C102.47 62.0963 104.774 63.77 107.374 63.77H156.456L116.747 92.6198C114.644 94.1476 113.765 96.8558 114.568 99.328L129.735 146.008L90.0267 117.158C87.9238 115.63 85.0762 115.63 82.9733 117.158L43.265 146.008L58.4322 99.328C59.2355 96.8558 58.3555 94.1476 56.2526 92.6198L16.5443 63.77H65.6265C68.2258 63.77 70.5295 62.0963 71.3328 59.6241Z" className="fill-color-2 stroke-color-1" strokeWidth="8" />
    </svg>
  )
}

export default memo(star)

