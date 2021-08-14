/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { updateMediaQueries } from "app/redux/reducers/viewport"
import store from "../redux/store"

class Viewport {
  public static onUpdateCallback = (querykey: string, queryValue: number) => { }
  public static listen(listenQueries: Record<string, string>) {
    for (const query in listenQueries) {
      if (Object.hasOwnProperty.call(listenQueries, query)) {

        const querykey = listenQueries[query]
        const queryValue = Number(query.match(/: (?<width>[0-9]+)/)?.groups?.width)
        const matchMediaQuery = window.matchMedia(query)

        if (matchMediaQuery.matches) {
          store.dispatch(updateMediaQueries({
            [querykey]: matchMediaQuery.matches
          }))

          this.onUpdateCallback(querykey, queryValue)
        }

        const matchMediaQueryCallback = (event: MediaQueryListEvent) => {
          if (event.matches) {
            store.dispatch(updateMediaQueries({
              [querykey]: event.matches
            }))

            this.onUpdateCallback(querykey, queryValue)
          }
        }

        if (matchMediaQuery.addEventListener) {
          matchMediaQuery.addEventListener("change", matchMediaQueryCallback)
        } else {
          matchMediaQuery.addListener(matchMediaQueryCallback)
        }
      }
    }
  }
}

export default Viewport