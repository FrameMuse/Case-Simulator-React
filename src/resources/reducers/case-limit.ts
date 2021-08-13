/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { SocketActions } from "app/socket/ClientSocket"

type Action = { type: string, payload: SocketActions["CASE_LIMIT"] }

const initState: Record<number, number | null> = {}

export default (state = initState, { type, payload }: Action) => {
  switch (type) {

    case "CASE_LIMIT":
      return {
        ...state,
        [payload.case_id]: payload.value
      }

    default:
      return state
  }
}
