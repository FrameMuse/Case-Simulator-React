/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { ErrorsStackErrorProps } from "app/components/other/ErrorsStack"

type Action = { type: string, payload: ErrorsStackErrorProps }

const initState = {

}

export default (state = initState, { type, payload }: Action) => {
  switch (type) {

    case "NOTIFY_STACK/ADD":
      return

    default:
      return state
  }
}
