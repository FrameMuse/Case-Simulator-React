/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { useEffect, useState } from "react"
import { classWithModifiers } from "../../../resources/utils"
// SCSS
import "../../../assets/scss/components/tumbler.scss"

interface TumblerProps {
  first?: string
  last?: string
  value?: number
  default?: number
  type?: string
  onChange?: (key: number, value?: string) => void | number
}

export default function Tumbler(props: TumblerProps) {
  const [state, _setState] = useState(props.value || props.default || 0)
  function setState(value: number) {
    if (props.onChange) {
      const onChangeReturn = props.onChange(value, [props?.first, props?.last][value])
      if (onChangeReturn != null) {
        return _setState(onChangeReturn)
      }
    }

    if (props.value == null) {
      _setState(value)
    }
  }
  useEffect(() => {
    if (props.value != null) {
      _setState(props.value)
    }
  }, [props.value])
  return (
    <div className={classWithModifiers("tumbler", [props.type])}>
      {props.first && (
        <span className={classWithModifiers("tumbler__text", state === 0 ? ["active"] : [])} onClick={() => setState(0)}>{props.first}</span>
      )}
      <div className="tumbler-shift" onClick={() => state ? setState(0) : setState(1)}>
        <div className={classWithModifiers("tumbler-shift__circle", [state ? "right" : "left"])}></div>
      </div>
      {props.last && (
        <span className={classWithModifiers("tumbler__text", state === 1 ? ["active"] : [])} onClick={() => setState(1)}>{props.last}</span>
      )}
    </div>
  )
}
