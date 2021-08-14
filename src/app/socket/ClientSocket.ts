/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import SocketIO from "./master"
import { User } from "../../resources/interfaces/user"
import { BattleJoin } from "../../views/battle/battle"
import { LiveFeedElementProps } from "views/header/live_feed"
import { getActionT, getUserInventory } from "app/api/actions"

type WidthdrawNotifyList = getActionT<ReturnType<typeof getUserInventory>>["withdrawNotify"]


export default new SocketIO({
  reconnectionDelay: 10
})

export interface SocketActions {
  LIVE: {
    TopliveList: LiveFeedElementProps[]
    liveList: LiveFeedElementProps[]
  }
  USER_INFO_UPDATE: User
  WITHDRAW_UPDATE_STATUS: {
    status: number
    drop_id: number
    updated_at: string // ISO Date
  }
  WITHDRAW_NOTIFY: WidthdrawNotifyList[0]
  BATTLES_JOIN: BattleJoin
  BATTLES_CREATE: {
    user_id: number
    case_id: number
    battle_id: number
  }
  BATTLES_CANCEL: SocketActions["BATTLES_CREATE"]
  TICKET_CLOSE: { id: number }
  CASE_LIMIT: {
    case_id: number
    value: number
  }
}

// Load socket actions
require("./actions")
