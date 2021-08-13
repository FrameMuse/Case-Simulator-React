/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { ValueOf } from "resources/interfaces/Object"

type Action = { type: string, payload: typeof initState }

const initState = {
  demo: false
}

export default (state = initState, action: Action) => {
  switch (action.type) {

    case "MODES/SWITCH":
      return {
        ...state,
        ...action.payload
      }

    default:
      return state
  }
}

export const switchMode = (mode: keyof typeof initState, state: ValueOf<typeof initState>) => ({
  type: "MODES/SWITCH",
  payload: {
    [mode]: state
  }
})
