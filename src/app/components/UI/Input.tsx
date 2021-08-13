/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SCSS
import "../../../assets/scss/components/input.scss"
// STAFF
import { InputHTMLAttributes } from "react"
import { classWithModifiers } from "../../../resources/utils"

type InputTypes = "text" | "number"

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: InputTypes
  icon?: any
  iconColor?: "white" | "broom"
  color?: "white"
}

function Input(props: InputProps) {
  return (
    <label className={props.className ? "input " + props.className : "input"}>
      {props.icon && (
        <div className={classWithModifiers("input__icon", [props.iconColor])}>
          {props.icon}
        </div>
      )}
      <input
        {...props}
        type={props.type || "text"}
        style={{ width: props.width, ...props.style }}
        className="input__input"
      />
    </label>
  )
}

export default Input
