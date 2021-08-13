/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { stat } from "../../views/footer/Statistics"
import { User } from "../interfaces/user"

type Action = { type: string, payload: User }

const initState: Record<stat, number> = {
  battles: 0,
  cases: 0,
  contracts: 0,
  upgrades: 0,
  online: 0,
  users: 0
}

// eslint-disable-next-line
export default (state = initState, { type, payload }: Action) => {
  switch (type) {

    case "STATISTIC_UPDATE":
      return { ...state, ...payload }

    default:
      return state
  }
}
