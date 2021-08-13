/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { combineReducers } from "redux"
import upgrade from "./upgrade"
import translation from "./translation"
import viewport from "./viewport"
import liveFeed from "./live-feed"
import localInventory from "./localInventory"
import errorsStack from "./errors-stack"
import popup from "./popup"
import contracts from "./contracts"
import filters from "./filters"
import modes from "./modes"

export const reducers = {
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
}

i

export default combineReducers(reducers)