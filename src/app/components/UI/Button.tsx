/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SCSS
import "../../../assets/scss/components/button.scss"
// STAFF
import { ButtonHTMLAttributes, memo, useState } from "react"
import { classAssign, classWithModifiers } from "../../../resources/utils"

interface ButtonProps {
  color?: "green" | "blue" | "yellow" | "red" | "orange"
  modify?: string
  padding?: string
  children?: any
  lazyClick?(): Promise<void>
}

export function ReusableButton(props: ButtonProps & ButtonHTMLAttributes<any>) {
  const [state, setState] = useState<"pending" | null>(null)
  const modifiers: string[] = []

  if (state) {
    modifiers.push(state)
  }

  if (props.modify) {
    modifiers.push(props.modify)
  }

  if (props.color) {
    modifiers.push(props.color)
  }

  async function lazyClick() {
    if (!props.lazyClick) return

    try {
      setState("pending")
      await props.lazyClick()
    } finally {
      setState(null)
    }
  }

  return (
    <button
      {...props}
      onClick={props.onClick || lazyClick}
      style={{ ...props.style, padding: props.padding }}
      disabled={state === "pending" || props.disabled}
      className={classAssign([classWithModifiers("button", modifiers), props.className])}
    >
      <div className="button__text">{props.children}</div>
    </button>
  )
}

const Button = memo(ReusableButton)

export default Button
