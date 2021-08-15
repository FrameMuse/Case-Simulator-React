/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { classAssign, classWithModifiers, stopBubbling } from "../../../resources/utils"
// SCSS
import "../../../assets/scss/components/button.scss"
import { useEffect, useRef, useState } from "react"

interface ButtonProps {
  type?: "magic" | "left-coll" | "right-coll"
  color?: "green" | "blue" | "yellow" | "red"
  iconLeft?: any
  iconRight?: any
  padding?: string
  keyPress?: string | string[]
  children: any
  disabled?: boolean
  className?: string
}

interface ButtonDefaultProps extends ButtonProps {
  submit?: undefined
  onClick?(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<any> | undefined
}

interface ButtonActionProps extends ButtonProps {
  submit?: boolean
  onClick?(finish: Function, form: HTMLFormElement): any
}

function ButtonTool(props: ButtonDefaultProps | ButtonActionProps) {
  const modifiers: Array<string | undefined> = [props.type, props.color]
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const BasicClassName = classWithModifiers("button", modifiers)
  const { ButtonAction, loading } = useButtonAction(buttonRef as any)

  if (loading) {
    modifiers.push("loading")
  }

  useEffect(() => {
    function handle(event: KeyboardEvent) {
      const { key, repeat, isTrusted } = event
      if (!repeat && isTrusted) {
        // if (ctrlKey && shiftKey) {
        const keys = props.keyPress instanceof Array ? props.keyPress : [props.keyPress]
        if (keys.includes(key)) {
          // alert(props.keyPress)
          // console.log(buttonRef.current);

          buttonRef.current && (buttonRef.current as unknown as HTMLElement).click()
          // props.onClick && props.onClick(event)
        }
        // }
      }
    }

    const handler = (event: KeyboardEvent) => handle(event)

    if (props.keyPress) {
      window.addEventListener("keydown", handler)
    }
    return () => {
      window.removeEventListener("keydown", handler)
    }
  }, [buttonRef.current])

  function clickEvent(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    // ...

    if (props.onClick) {
      // Button Action
      if (props.submit) {
        ButtonAction(event, props.onClick)
      } else {
        ButtonAction(event, async (finish) => {
          await (props.onClick as Function)(event)
          finish()
        })
        // (props.onClick as Function)(event)
      }
    }
  }

  return (
    <button
      ref={buttonRef}
      type={props.submit ? "submit" : undefined}
      disabled={props.disabled || loading}
      style={{ padding: props.padding }}
      className={classAssign([props.className, BasicClassName])}
      onClick={clickEvent}
    >
      {props.iconLeft && <div className="button__icon">{props.iconLeft}</div>}
      <span className="button__text">{props.children}</span>
      {props.iconRight && <div className="button__icon">{props.iconRight}</div>}
    </button>
  )
}

// export const Button = memo(ButtonExpensive)

function useButtonAction<A = React.MouseEvent<HTMLButtonElement, MouseEvent>>(buttonRef: React.MutableRefObject<HTMLFormElement | null>) {
  const [loading, setLoading] = useState(false)
  const { current: button } = buttonRef
  // Tests for errors
  if (process.env.NODE_ENV === "development") {
    if (!button) {
      // console.warn("Button current is null", button);
    }
  }
  // Button Action
  function ButtonAction(event: A, callback: (finish: Function, form: HTMLFormElement) => Promise<any> | undefined) {
    stopBubbling(event)


    const { current: button } = buttonRef


    return new Promise<void>((resolve) => {
      if (!button) {
        return
        // return reject("Button is null")
      }

      const { form } = button

      // Check form validation
      if (form) {
        if (!form.checkValidity()) {
          form.reportValidity()
          return
        }
      }

      // Set button width
      // button.style.width = clientWidth + "px";
      // Start loading
      setLoading(true)
      // Set resolver
      function finish() {
        // Stop loading
        setLoading(() => {
          // Unfix button width
          // if (button) {
          //   button.style.width = "";
          // }

          resolve()
          return false
        })
      }
      // Run callback
      callback.call(event, finish, form)
    })
  }

  return { ButtonAction, loading }
}

// class KeyDownController {
//   private keys: RegularObject = {}
//   private onlySingle: boolean
//   private onlyTrusted: boolean
//   private callback(Key: object) {}
//   private handler(event: KeyboardEvent) {
//     const { key, repeat, ctrlKey, shiftKey, isTrusted } = event
//     // event.preventDefault()
//     // Boolean either 0 or 1 and it can be compared, so...
//     // If onlySignle is 0, will pass anyway
//     // If onlySignle is 1, will pass only when repeat is 1
//     if (repeat >= this.onlySingle && isTrusted >= this.onlyTrusted) {
//       const Key = this.keys[key]

//       if (ctrlKey >= Key.ctrl && shiftKey >= Key.shift) { 
//         if (key === Key.name) {
//           this.callback(Key)
//         }
//       }
//     }
//   }

//   public addKey(name: string, ctrl?: boolean, shift?: boolean) {
//     this.keys[name] = { name, ctrl, shift }
//   }

//   public subscribe(callback: (Key: object) => void, element) {
//     this.callback = callback
//     (element || window).addEventListener("keydown", event => this.handler(event))
//   }

//   public unsubscribe() {
//     window.removeEventListener("keydown", event => this.handler(event))
//   }

//   public constructor(onlyTrusted = true, onlySingle = true) {
//     this.onlySingle = onlySingle
//     this.onlyTrusted = onlyTrusted
//   }
// }

export default ButtonTool
