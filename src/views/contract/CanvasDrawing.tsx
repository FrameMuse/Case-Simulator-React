/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { SyntheticEvent, useEffect, useState } from "react"

export default function CanvasDrawing(props: { className?: string; color?: string; }) {
  const [coords, setCoords] = useState([0, 0])
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null)
  const [shouldDraw, setShouldDraw] = useState(false)

  function mouseMove(event: SyntheticEvent<HTMLCanvasElement, MouseEvent>) {
    if (!canvas)
      return
    if (!shouldDraw)
      return
    if (!event.isTrusted)
      return

    event.preventDefault()

    const x = event.nativeEvent.offsetX
    const y = event.nativeEvent.offsetY

    const context = canvas.getContext("2d")

    if (context) {
      draw(context, x, y)
      setCoords([x, y])
    }
  }

  function draw(context: CanvasRenderingContext2D, x: number, y: number) {
    const [prevX, prevY] = coords

    context.beginPath()
    context.lineCap = "round"
    context.strokeStyle = props.color || "red"
    context.lineWidth = 2
    context.moveTo(prevX || x, prevY || y)
    context.lineTo(x, y)
    context.stroke()
    context.closePath()
  }

  const mouseDown = () => {
    if (!canvas)
      return

    setCoords([0, 0])
    setShouldDraw(true)
  }

  useEffect(() => {
    function resize() {
      if (!canvas)
        return

      canvas.width = canvas.clientWidth
      canvas.height = canvas.clientHeight
    }
    resize()
    window.addEventListener("resize", resize)
    return () => {
      window.removeEventListener("resize", resize)
    }

  }, [canvas])

  return (
    <canvas
      className={props.className}
      ref={setCanvas}
      onMouseMove={mouseMove}
      onMouseDown={mouseDown}
      onMouseUp={() => setShouldDraw(false)}
      onMouseOut={() => setShouldDraw(false)} />
  )
}
