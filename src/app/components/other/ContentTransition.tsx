/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { CSSProperties, useEffect, useRef, useState } from "react"
import { classWithModifiers } from "resources/utils"

export default function ContentTransition(props: { in?: any[]; disabled?: boolean; className?: string; style?: CSSProperties; speed?: string; children: any; }) {
  const [height, setHeight] = useState<number | null>(null)
  const contentRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (contentRef.current) {
      const firstChild = contentRef.current.firstChild as HTMLElement | null

      if (firstChild) {
        setHeight(firstChild.offsetHeight)
      }
    }
  }, [props.in])

  if (props.disabled) {
    return props.children || null
  }

  return (
    <div className={classWithModifiers("content-transition", [props.in && "entered"])} style={{ ...props.style, "--height": `${height}px`, "--speed": props.speed }} ref={contentRef}>
      <div className="content-transition__container">
        {props.children}
      </div>
    </div>
  )
}
