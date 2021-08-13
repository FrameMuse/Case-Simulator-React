/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { fetchGiveawayLoadMore } from "app/api/actions"
import { ClientAPI } from "app/api/client"
import { QueryProvider, useContextQuery } from "app/components/other/MutuableQuery"
import Popup from "app/controllers/Popup"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { PopupDefaultLayout } from "../PopupProvider"
import { PlayerListProps } from "./Bonus3kPopup"

export default function PlayersListPopup(props: PlayerListProps) {
  return (
    <PopupDefaultLayout>
      <QueryProvider action={fetchGiveawayLoadMore(0, props.name)}>
        <PlayersListContainer {...props} />
      </QueryProvider>
    </PopupDefaultLayout>
  )
}

function PlayersListContainer(props: PlayerListProps) {
  const { payload, modifyPayload } = useContextQuery<ReturnType<typeof fetchGiveawayLoadMore>>()
  const [offset, setOffset] = useState(payload.list.length)
  const [shouldLoad, setShouldLoad] = useState(false)
  // useEffect(() => {
  //   function reflow(top: number) {
  //     if (contentRef) {
  //       const { scrollHeight } = contentRef


  //     }
  //   }
  //   const event = debounce((event: React.event) => {
  //     if (!event.isTrusted) return
  //     reflow(event.currentTarget)
  //   }, 100)
  //   contentRef?.addEventListener("scroll", event)
  //   return () => {
  //     contentRef?.removeEventListener("scroll", event)
  //   }
  // }, [contentRef])
  function onScroll(event: React.UIEvent<HTMLDivElement>) {
    const SCROLL_THRESHOLD = 200 // Pixels
    const { offsetHeight, scrollHeight, scrollTop } = event.currentTarget
    const height = scrollHeight - offsetHeight
    // console.log(height, scrollHeight, scrollTop);

    if (!event.isTrusted) return
    if ((height - scrollTop) > SCROLL_THRESHOLD) return
    // console.log(123);

    // debounce(() => {
    setShouldLoad(true)
    // }, 100)
  }
  useEffect(() => {
    if (shouldLoad && payload.more) {
      // console.log("ok");

      ClientAPI
        .query(fetchGiveawayLoadMore(offset, props.name))
        .then(({ error, payload: newPayload }) => {
          if (error || !newPayload) return

          setOffset(s => s + newPayload.list.length)
          setShouldLoad(!newPayload.more)
          modifyPayload({
            ...payload,
            list: [
              ...payload.list,
              ...newPayload.list
            ]
          })
        })

    }
  }, [shouldLoad])
  return (
    <div onScroll={onScroll} className="player-lest">
      {payload.list.map((player, index) => (
        <div key={"player_" + index}>
          <img src={player.user.photo} className="player-lest__player" key={"avatar_" + index} alt="avatar" />
          <Link className="ghost" to={"/profile/" + player.user.id} onClick={() => Popup.resolveAll()} />
        </div>
      ))}
    </div>
  )
}
