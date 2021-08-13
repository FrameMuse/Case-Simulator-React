/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { useLayoutEffect, useState } from "react"
import { classAssign, classWithModifiers } from "resources/utils"


export default function TextOverflow({ className, children }: { className: string; children: string; }) {
  const [inner, setInner] = useState<HTMLSpanElement | null>(null)
  const [isOutOfLine, setIsOutOfLine] = useState(false)
  useLayoutEffect(() => {
    if (inner) {
      const childWidth = inner.offsetWidth
      const parrent = inner.parentElement
      if (parrent) {
        const parrentWidth = parrent.offsetWidth
        setIsOutOfLine(childWidth > parrentWidth)
      }
    }
  }, [inner])
  return (
    <div className={classAssign(["text-overflow", className])}>
      <span className={classWithModifiers("text-overflow__inner", [isOutOfLine && "out-of-line"])} ref={setInner}>{isOutOfLine ? children + " " + children : children}</span>
    </div>
  )
}
