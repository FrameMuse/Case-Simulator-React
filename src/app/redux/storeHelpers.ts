import { DefaultReducers } from "react-redux"
import { combineReducers, ReducersMapObject } from "redux"
import store from "./store"

declare module "redux" {
  interface Store {
    actionSubscribe: typeof actionSubscribe;
    injectReducers: typeof injectReducers;
  }

  interface Dispatch { <T extends any>(action: T): T }
}

let asyncReducers: ReducersMapObject<DefaultReducers>
const subscriptions = new Set<Function>()

export function actionSubscribe(callback: (action: { payload: any; type: string; }) => void) {
  subscriptions.add(callback)
  return () => {
    subscriptions.delete(callback)
  }
}
export function injectReducers(reducers: ReducersMapObject) {
  asyncReducers = {
    ...asyncReducers,
    ...reducers
  }
  store.replaceReducer(combineReducers(asyncReducers))
}
