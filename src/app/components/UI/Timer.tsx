/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { CSSProperties, Fragment, useEffect, useState } from "react"

// type TimerTemplate = "seconds" | "minutes" | "hours" | "day" | "month" | "year"

interface TimerProps {
  date: Date | string | number;
  // entries: TimerTemplate[];
  autoUpdate?: number;
  style?: CSSProperties;
}

export default function Timer(props: TimerProps) {
  const [diffDate, setDiffDate] = useState(getNewDiffDate())
  const time = diffDate.toLocaleDateTime().split(",")[1]
  function getNewDiffDate() {
    return (
      new Date(new Date(props.date).getTime() - Date.now())
    )
  }
  // function getDateEntry(template: TimerTemplate) {
  //   return ({
  //     seconds: diffDate.getSeconds(),
  //     minutes: diffDate.getMinutes(),
  //     hours: diffDate.getHours(),
  //     day: diffDate.getDay(),
  //     month: diffDate.getMonth(),
  //     year: diffDate.getFullYear(),
  //   })[template]
  // }
  useEffect(() => {
    const interval = setInterval(() => {
      setDiffDate(getNewDiffDate())
    }, props.autoUpdate || 200)

    return () => {
      clearInterval(interval)
    }
  }, [props.date])
  return (
    <div className="timer" style={props.style}>
      {time.split(":").map((entry, index) => (
        <Fragment key={"entry_" + index}>
          <div className="timer__entry">{entry}</div>
          <div className="timer__spliiter">:</div>
        </Fragment>
      ))}
    </div>
  )
}

export function TimerCountDown({ distance: initDistance, children, simple, onEnd }: { distance: number; onEnd?: () => void; children?: any; simple?: boolean }) {
  const [distance, setDistance] = useState(initDistance * 1000)

  function fixZeros(integer: number, min = 2) {
    let string = String(integer)

    if (string.length < min) {
      string = "0" + string
    }

    return string
  }

  const seconds = Math.floor((distance % (1000 * 60)) / 1000)
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const days = Math.floor(distance / (1000 * 60 * 60 * 24))

  useEffect(() => {
    const interval = setInterval(() => {

      setDistance(distance => {
        const newDistance = distance - 1000
        if (newDistance < 0) {
          onEnd?.()
        }
        return newDistance
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [distance, onEnd])

  if (children && distance < 0) {
    return children
  }

  if (simple) {
    return `${fixZeros(hours)}:${fixZeros(minutes)}:${fixZeros(seconds)}`
  }

  return (
    <div className="timer">
      {Boolean(days) && (
        <Fragment>
          <div className="timer__entry">{fixZeros(days)}</div>
          <div className="timer__spliiter">:</div>
        </Fragment>
      )}
      <Fragment>
        <div className="timer__entry">{fixZeros(hours)}</div>
        <div className="timer__spliiter">:</div>
      </Fragment>
      <Fragment>
        <div className="timer__entry">{fixZeros(minutes)}</div>
        <div className="timer__spliiter">:</div>
      </Fragment>
      <Fragment>
        <div className="timer__entry">{fixZeros(seconds)}</div>
        <div className="timer__spliiter">:</div>
      </Fragment>
    </div>
  )
}
