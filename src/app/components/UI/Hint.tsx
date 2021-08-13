/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SCSS
import { useEffect, useLayoutEffect, useState } from "react"
// STAFF
import "../../../assets/scss/components/hint.scss"
import { classWithModifiers } from "../../../resources/utils"

interface HintProps {
  x?: string
  y?: string
  right?: boolean
  bottom?: boolean
  children: any
}

function useWindowSize() {
  const [size, setSize] = useState([window.innerWidth, window.innerHeight])
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth || window.outerWidth, window.innerHeight])
    }
    window.addEventListener("resize", updateSize)
    updateSize()
    return () => window.removeEventListener("resize", updateSize)
  }, [])
  return size
}

export default function Hint({ x, y, right, bottom, children }: HintProps) {
  const [position, setPosition] = useState<{ left?: number }>({})
  const [hintRef, setHintRef] = useState<HTMLDivElement | null>(null)
  const [windowWidth] = useWindowSize()
  const style = {
    ...position,
    "--hint-x": x,
    "--hint-y": y,
    "--hint-bottom": bottom ? -1 : 1,
  }
  useEffect(() => {
    const rects = getHintRefRects()
    function getHintRefRects() {
      if (hintRef) {
        const rects = hintRef.getBoundingClientRect()

        if (rects.width === 0) {
          return null
        }
        return rects
      }
      return null
    }
    // Expensive
    function getNewPostion() {
      if (hintRef && rects) {
        // const offset = rects.right - (position.left || 0) + 36 // 36 for scrollbar
        const offset = rects.right + 36
        // alert(offset + " asd " + windowWidth)
        if (offset > windowWidth) {
          setPosition({
            left: (windowWidth - offset)
          })
        } else {
          setPosition({})
        }
      }
    }
    getNewPostion()

    const interval = setInterval(getNewPostion, 50)
    if (rects) {
      clearInterval(interval)
    }
    return () => {
      clearInterval(interval)
    }
  }, [hintRef, windowWidth])
  return (
    <div className={classWithModifiers("hint", [right && "right"])} style={style} ref={setHintRef}>
      <div className="hint__field">
        <div className="hint__content">{children}</div>
      </div>
    </div>
  )
}