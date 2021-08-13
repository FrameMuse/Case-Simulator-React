/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

export const UPDATE_QUERIES = "MEDIA_QUERY/UPDATE_QUERIES"

export type MediaQueries = Record<string, boolean>

interface MediaQueryAction {
  type: string
  payload: {
    queries: MediaQueries
  }
}

const defaultState = {
  desktop: false,
  tablet: false,
  mobile: false
}

export default (state = defaultState, { type, payload }: MediaQueryAction) => {
  switch (type) {
    case UPDATE_QUERIES:
      return {
        ...defaultState,
        ...payload.queries
      }
      
    default:
      return state
  }
}

export const updateMediaQueries = (queries: MediaQueries) => ({
  type: UPDATE_QUERIES,
  payload: {
    queries
  }
})

