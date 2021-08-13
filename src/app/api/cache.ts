/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { createCache, QueryResponse } from "react-fetching-library"

const cacheTime = 0

export const СacheProvider = createCache<QueryResponse<any>>(
  (action) => {
    return action.method === "GET"
  },
  (response) => {
    return Date.now() - response.timestamp < cacheTime
  }
)
