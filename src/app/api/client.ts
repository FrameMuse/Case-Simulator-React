/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { ErrorObject } from "app/components/other/Error"
import { Action as BaseAction, Client, createClient, QueryResponse } from "react-fetching-library"
import { addNotify } from "app/redux/reducers/errors-stack"
import store from "../redux/store"
import { СacheProvider } from "./cache"

export type Action<T = {}> = BaseAction<T & { error?: ErrorObject }>

const requestHostInterceptor = (host: string) => (_client: Client) => async (action: Action) => {
  return {
    ...action,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      // 'X-XSRF-TOKEN': (document.cookie).split(";").find(cookie => cookie.search(/XSRF-TOKEN/) >= 0)?.replace("XSRF-TOKEN=", ""),
      "X-CSRF-TOKEN": (document.cookie).split(";").find(cookie => cookie.search(/XSRF-TOKEN/) >= 0)?.replace("XSRF-TOKEN=", "")
    },
    referrer: window.location.hostname,
    credentials: "include",
    endpoint: `${host}${action.endpoint}`,
  } as Action
}

const responseInterceptor = () => async (_action: Action, response: QueryResponse<{ error?: ErrorObject }>) => {
  // console.log(response);

  if (process.env.NODE_ENV === "development") {
    if (response.error) {
      store.dispatch(addNotify("API Error: Bad status: " + response.status, "error"))
    }

    const error = response.payload as any
    // console.log(error);
    if (error.trace) {
      // console.log(error);

      store.dispatch({
        type: ""
      })

      store.dispatch(addNotify(`
        In file "${error.file}" at ${error.line} line was thrown exception "${error.exception}": "${error.message}"
      `, "error"))
    }
  }

  if (response.error) {
    store.dispatch(addNotify(response.errorObject?.name || "unknown", "error"))
  }

  if (response.payload?.error) {
    store.dispatch(addNotify(response.payload.error.code, "error", response.payload.error.data))

    return {
      ...response,
      error: true
    }
  }

  return response
}

export const ClientAPI = createClient({
  // None of the options is required
  requestInterceptors: [requestHostInterceptor(process.env.REACT_APP_SITE_API_URL!)],
  responseInterceptors: [responseInterceptor],
  cacheProvider: СacheProvider,
  // fetch() {

  // },
})
