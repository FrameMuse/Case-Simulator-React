/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// Import
import { DefaultReducers } from "react-redux"
import { createStore, applyMiddleware, compose, combineReducers, Store, ReducersMapObject, Reducer, AnyAction } from "redux"
import combinedReducers from "../reducers/master"
import thunk from "redux-thunk"
import { Dispatch } from "react"

declare module "react-redux" {
  interface DefaultReducers extends ReturnType<typeof combinedReducers> { }
  interface DefaultRootState extends DefaultReducers { }
}

class WebStore {
  public static store: Store<DefaultReducers>
  private static asyncReducers: ReducersMapObject<DefaultReducers>
  private static subscriptions = new Set<Function>()
  public static create(reducer: Reducer<any, any>) {
    WebStore.store = createStore(
      reducer,
      compose(applyMiddleware(thunk, () => {
        return (next: Dispatch<AnyAction>) => (action) => {
          this.subscriptions.forEach(callback => callback(action))
          // Continue
          return next(action)
        }
      }))
    )

    return WebStore.store
  }

  public static subscribe(callback: (action: { payload: any; type: string }) => void) {
    this.subscriptions.add(callback)
    return () => {
      this.subscriptions.delete(callback)
    }
  }

  public static injectReducers(asyncReducers: ReducersMapObject) {
    WebStore.asyncReducers = {
      ...WebStore.asyncReducers,
      ...asyncReducers
    }
    WebStore.store.replaceReducer(WebStore.joinReducers(WebStore.asyncReducers))
  }
  private static joinReducers(reducers: ReducersMapObject) {
    return combineReducers({
      ...WebStore.asyncReducers,
      ...reducers
    })
  }
}

// Create new store
WebStore.create(combinedReducers)

export default WebStore
