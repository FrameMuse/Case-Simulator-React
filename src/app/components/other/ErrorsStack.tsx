/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SCSS
import "../../../assets/scss/components/errors-stack.scss"
// STAFF
import { useDispatch, useSelector } from "react-redux"
import { classWithModifiers } from "../../../resources/utils"
import useTranslation from "resources/hooks/useTranslation"
import { TranslationJSONRaw } from "app/controllers/Translation"

export default function ErrorsStack() {
  const errorsStack = useSelector(state => state.errorsStack)
  return (
    <div className="errors-stack">
      <div className="errors-stack__inner">
        {errorsStack.map(error => (
          <ErrorsStackError key={"stackError" + error.id} {...error} />
        ))}
      </div>
    </div>
  )
}

type type = "success" | "error"
type Message = Exclude<keyof TranslationJSONRaw["notifies"], type>

export interface ErrorsStackErrorProps {
  id: number
  message: Message | (string & {}) | number
  type?: type
  data?: any
}

function ErrorsStackError({ id, type, message, data }: ErrorsStackErrorProps) {
  const notifies = useTranslation(trans => trans.notifies)
  const dispatch = useDispatch()
  const RemoveNotify = () => dispatch({
    type: "NOTIFY_STACK/REMOVE",
    payload: {
      id
    }
  })
  return (
    <div className={classWithModifiers("errors-stack__error", [type])} onClick={RemoveNotify}>
      <span className="errors-stack__text">{type && notifies[type]} {String(notifies[message] || message).replace("data", data)}</span>
      <div className="errors-stack__bar" onAnimationEnd={RemoveNotify} />
    </div>
  )
}
