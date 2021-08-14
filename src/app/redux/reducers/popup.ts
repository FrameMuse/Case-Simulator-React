/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { PopupQueue } from "app/controllers/Popup"

type Action = { type: string, payload: typeof initState }

export const POPUP_CLEAR = "POPUP/CLEAR"
export const POPUP_PUSH = "POPUP/PUSH"
export const POPUP_POP = "POPUP/POP"

const initState = {
  queue: [] as PopupQueue[]
} as const

export default (state = initState, { type, payload }: Action) => {
  switch (type) {

    case POPUP_CLEAR:
      return {
        ...state,
        queue: []
      }

    case POPUP_PUSH:
      return {
        ...state,
        queue: [...state.queue, ...payload.queue]
      }

    case POPUP_POP:
      return {
        ...state,
        queue: state.queue.filter(d => d !== (payload as unknown as PopupQueue))
      }

    default:
      return state
  }
}
