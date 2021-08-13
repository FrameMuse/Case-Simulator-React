/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { ErrorObject } from "app/components/other/Error"
import { useEffect, useMemo } from "react"
import { Action, QueryResponse, useQuery, UseQueryResponse } from "react-fetching-library"
import { DefaultReducers, useDispatch, useSelector, useStore } from "react-redux"
import { reducers } from "resources/reducers/master"
import WebStore from "resources/stores/store"

let lastPromise: Promise<any> | null = null
let lastEndpoint: Action["endpoint"] | null = null

export type QueryPayload<T, R extends keyof DefaultReducers = never> = (DefaultReducers[R] | T) & { error: ErrorObject }
function useMutableQuery<T = any, C = any, R extends keyof DefaultReducers = never>(action: Action<T, C>, reducer?: R | undefined): UseQueryResponse<QueryPayload<T, R>> {
  const response = useQuery<QueryPayload<T, R>, C>(action, action.method === "POST")
  const store = useSelector(state => reducer && state[reducer]) as QueryPayload<T, R>

  useEffect(() => {
    if (action.method === "POST") return

    (async () => {
      if (lastEndpoint === action.endpoint) {
        await lastPromise
      }

      lastPromise = response.query()
      lastEndpoint = action.endpoint
    })()
  }, [action.endpoint])
  useEffect(() => {
    if (!reducer) return
    return WebStore.subscribe(action => {
      if (store) return

      WebStore.store.dispatch({
        ...action,
        payload: response.payload
      })
    })
  }, [reducer, response.payload])

  if (store) {
    response.payload = store
  }

  return useMemo(() => response, [response.error, response.loading])
}

export default useMutableQuery
