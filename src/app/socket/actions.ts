/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import WebStore from "resources/stores/store"
import { delay } from "resources/utils"
import { LiveFeedElementProps } from "views/header/live_feed"
import { TicketContext } from "views/support/TicketFactory"
import ClientSocket, { SocketActions } from "./ClientSocket"

const { dispatch } = WebStore.store

async function dispatchLazyLiveEvent(payload: SocketActions["LIVE"]["TopliveList"], timeDelay: number) {
  if (timeDelay > 0) {
    await delay(timeDelay)
  }

  dispatch({
    type: "LIVE",
    payload: {

    }
  })
}

const TIME_DIFF_THRESHOLD = 200 // 200ms
function LiveMiddleWare(element: LiveFeedElementProps) {
  if (element.fast) {
    return element
  }

  const created_at = new Date(element.created_at)
  const delayedUntill = created_at.getTime() + (15 * 1000) // For 15 seconds
  // const timeDiff = delayedUntill - Date.now()

  // Qualing time
  element.created_at = new Date(delayedUntill)

  return element
}

// ClientSocket.set("LIVE", (payload) => {
//   dispatch({
//     type: "LIVE",
//     payload: {
//       TopliveList: payload.TopliveList.map(LiveMiddleWare),
//       liveList: payload.liveList.map(LiveMiddleWare)
//     }
//   })
// })
