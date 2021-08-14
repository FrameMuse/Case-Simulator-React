/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { getActionT } from "app/api/actions"
import { Action } from "app/api/client"
import { createContext, useContext, useEffect, useState } from "react"
import { QueryResponse, useMutation, UseQueryResponse } from "react-fetching-library"
import { DefaultReducers } from "react-redux"
import { QueryPayload } from "../../../resources/hooks/useCacheQuery"
import AuthRequired from "./AuthRequired"
import ContentTransition from "./ContentTransition"
import Error from "./Error"
import Loader from "./Loader"

interface MutuableQueryProps<T, C, R extends keyof DefaultReducers = never, G extends UseQueryResponse<QueryPayload<T, R>> = any> {
  deps?: any[]
  action: Action<T>
  animated?: boolean
  reducer?: R
  children<Y extends UseQueryResponse<QueryPayload<T, R>>>(response: Y & { payload: {} }): any
}

function MutuableQuery<T = any, C = any, R extends keyof DefaultReducers = never, G = any>(props: MutuableQueryProps<T, C, R> & { requireAuth?: boolean }) {
  // if (props.requireAuth) {
  //   return (
  //     <AuthRequired>
  //       <Query__UnSafe<T, C, R> {...props} />
  //     </AuthRequired>
  //   )
  // }
  // return <Query__UnSafe<T, C, R> {...props} />

  const children = (
    <QueryProvider action={props.action}>
      <QueryCunsumer children={props.children as any} />
    </QueryProvider>
  )

  if (props.requireAuth) {
    return <AuthRequired>{children}</AuthRequired>
  }

  return children
}

type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>
interface QueryExtenstion<T = {}> {
  modifyPayload: React.Dispatch<React.SetStateAction<T | undefined>>
  mutate(action?: Partial<Action>): Promise<QueryResponse<T>>;
}
export type QueryContextResponse<A extends Action, U = never, T = getActionT<A>> = RequiredBy<UseQueryResponse<T | U>, "payload"> & QueryExtenstion<T>
export const QueryContext = createContext<UseQueryResponse<any> & QueryExtenstion>({
  error: false,
  loading: true,
  abort: () => { },
  reset: () => { },
  query: () => new Promise(() => { }),
  mutate: () => new Promise(() => { }),
  modifyPayload: () => { }
})

export function QueryProvider(props: { unsuspend?: boolean; action: Action; initFetch?: boolean; children: any; }) {
  const response = useMutation((action: any) => ({ ...props.action, ...action }))
  const [payload, modifyPayload] = useState(response.payload)
  Object.freeze(payload)
  useEffect(() => modifyPayload(response.payload), [response.payload])
  useEffect(() => {
    if (props.initFetch ?? true) {
      response.mutate({})
    }
  }, [])
  useEffect(() => {
    response.mutate(props.action)
  }, Object.values(props.action))

  const PAYLOAD_VALID = Boolean(payload)
  const contextValue = {
    ...response,
    modifyPayload,
    query: () => response.mutate({}),
    mutate: (action?: Action) => response.mutate(action),
    payload
  }

  Object.seal(response)
  Object.seal(contextValue)
  Object.freeze(response)
  Object.freeze(contextValue)

  return (
    <>
      <ContentTransition disabled={true} in={[contextValue.payload]}>
        <QueryContext.Provider value={contextValue}>
          {props.unsuspend && props.children}
          {PAYLOAD_VALID && !contextValue.error && !props.unsuspend && props.children}
        </QueryContext.Provider>
      </ContentTransition>
      {contextValue.loading && !props.unsuspend && <Loader overlap={PAYLOAD_VALID} />}
      {contextValue.error && (
        <Error overlap={PAYLOAD_VALID} {...response.payload?.error} onClick={contextValue.query} />
      )}
    </>
  )
}
export function QueryCunsumer<A extends Action = any, U = never>(props: { children: (response: QueryContextResponse<A, U>) => any }) {
  const response = useContextQuery<A>()
  return props.children(response)
}


export function useContextQuery<A extends Action = any, U = never>() {
  const response = useContext(QueryContext) as QueryContextResponse<A, U>
  return response
}

export default MutuableQuery
