/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { ErrorsStackErrorProps } from "../../app/components/other/ErrorsStack"

type Action = { type: string, payload: ErrorsStackErrorProps }

let errorsCount = 0
const initState: Array<ErrorsStackErrorProps> = []

export default (state = initState, { type, payload }: Action) => {
  switch (type) {

    case "NOTIFY_STACK/ADD":
      errorsCount += 1
      return [...state, { ...payload, id: errorsCount }]

    case "NOTIFY_STACK/REMOVE":
      return state.filter(error => error.id !== payload.id)

    default:
      return state
  }
}

export const addNotify = (message: ErrorsStackErrorProps["message"], type?: ErrorsStackErrorProps["type"], data?: any) => ({
  type: "NOTIFY_STACK/ADD",
  payload: {
    type,
    message,
    data
  }
})
