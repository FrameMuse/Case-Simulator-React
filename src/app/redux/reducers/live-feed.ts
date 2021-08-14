/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { SocketActions } from "app/socket/ClientSocket"

type Action = { type: "LIVE", payload: typeof initState }

const initState: SocketActions["LIVE"] = {
  TopliveList: [],
  liveList: []
}

export default (state = initState, action: Action) => {
  switch (action.type) {

    case "LIVE":
      return {
        ...state,
        TopliveList: [...action.payload.TopliveList, ...state.TopliveList].slice(0, 20),
        liveList: [...action.payload.liveList, ...state.liveList].slice(0, 20),
      }

    default:
      return state
  }
}
