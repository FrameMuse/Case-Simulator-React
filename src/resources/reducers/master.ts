/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { combineReducers } from "redux"
import upgrade from "./upgrade"
import translation from "./translation"
import user from "./user"
import viewport from "./viewport"
import liveFeed from "./live-feed"
import localInventory from "./localInventory"
import errorsStack from "./errors-stack"
import popup from "./popup"
import contracts from "./contracts"
import filters from "./filters"
import modes from "./modes"
import caseLimit from "./case-limit"

export const reducers = {
  user,
  popup,
  viewport,
  translation,
  upgrade,
  liveFeed,
  localInventory,
  errorsStack,
  contracts,
  filters,
  modes,
  caseLimit,
}

export default combineReducers(reducers)