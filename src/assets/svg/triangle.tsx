/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { ComponentProps } from "react"

export function TriangleSVGExpensive(props: ComponentProps<"svg">) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 20" id="svg-icon" className="svg-triangle" {...props}>
      <path id="penis" d="M10 15L 1 1L 22 1L 12 18Z" />
    </svg>
  )
}

export default TriangleSVGExpensive
