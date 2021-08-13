/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import SvgSheet from "../../../assets/svg/svg-sheet.svg"

export default function SvgUse({ href, className }: { href: string, className?: string }) {
  return (
    <svg id="svg-icon" className={className}>
      <use href={SvgSheet + "#" + href} />
    </svg>
  )
}
