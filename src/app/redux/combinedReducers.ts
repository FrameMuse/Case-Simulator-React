/* eslint-disable @typescript-eslint/no-var-requires */
/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// Auto-Generated file

import { combineReducers } from "redux"

declare module "react-redux" {
  interface DefaultReducers extends ReturnType<typeof combinedReducers> { }
  interface DefaultRootState extends DefaultReducers { }
}

const reducers = {
  // --Reducers Start--
  popup: require("./reducers/popup").default as typeof import("./reducers/popup").default,
  viewport: require("./reducers/viewport").default as typeof import("./reducers/viewport").default,
  translation: require("./reducers/translation").default as typeof import("./reducers/translation").default,
  upgrade: require("./reducers/upgrade").default as typeof import("./reducers/upgrade").default,
  liveFeed: require("./reducers/live-feed").default as typeof import("./reducers/live-feed").default,
  errorsStack: require("./reducers/errors-stack").default as typeof import("./reducers/errors-stack").default,
  contracts: require("./reducers/contracts").default as typeof import("./reducers/contracts").default,
  filters: require("./reducers/filters").default as typeof import("./reducers/filters").default,
  user: require("./reducers/user").default as typeof import("./reducers/user").default,
  // --Reducers End--
}

const combinedReducers = combineReducers(reducers)
export default combinedReducers