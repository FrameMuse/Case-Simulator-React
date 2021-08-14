/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SCSS
import "assets/scss/popups/bonus-3k.scss"
// IMAGES
import { ReactComponent as SVGStar } from "assets/svg/star.svg"
// STAFF
import { PopupArticle, PopupDefaultLayout } from "../PopupProvider"
import useTranslation from "resources/hooks/useTranslation"
import { TimerCountDown } from "app/components/UI/Timer"
import Input from "app/components/UI/Input"
import Button from "app/components/UI/Button"
import { classWithModifiers, inter } from "resources/utils"
import { QueryProvider, useContextQuery } from "app/components/other/MutuableQuery"
import { fetchGiveawayInfo, fetchGiveawaySave } from "app/api/actions"
import { Person } from "resources/interfaces/user"
import { ClientAPI } from "app/api/client"
import useAddNotify from "resources/hooks/useAddNotify"
import Popup from "app/controllers/Popup"
import PlayersListPopup from "./PlayersListPopup"

export default function Bonus3kPopup() {
  return (
    <PopupDefaultLayout className="bonus-3k" width="70em">
      <QueryProvider action={fetchGiveawayInfo}>
        <Bonus3kPopupContainer />
      </QueryProvider>
    </PopupDefaultLayout>
  )
}

function Bonus3kPopupContainer() {
  const addNotify = useAddNotify()
  const { payload, modifyPayload } = useContextQuery<typeof fetchGiveawayInfo>()
  const { article, contestArticle, other } = useTranslation(trans => trans.popup.bonus3k)
  function formSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const standoffId = event.currentTarget.elements.namedItem("standoff_id") as HTMLInputElement | null
    if (standoffId) {
      if (standoffId.value) {
        ClientAPI
          .query(fetchGiveawaySave(Number(standoffId.value)))
          .then(({ error }) => {
            if (error) return
            addNotify("giveAwaySubmited", "success")
            modifyPayload({
              ...payload,
              me: {
                id: 0,
                user_id: 0,
                status: "nothing"
              }
            })
          })
      }
    }
  }
  return (
    <>
      <div className="bonus-3k__header">
        <PopupArticle title={article?.title}>
          {article?.desc}
        </PopupArticle>
        <TimerCountDown distance={(new Date(payload.time).getTime() - Date.now()) / 1000} />
      </div>
      <form className={classWithModifiers("bonus-3k__contest", [payload.me?.status])} onSubmit={formSubmit}>
        <PopupArticle heading="h3" title={contestArticle?.title}>
          {inter(contestArticle?.desc)}
        </PopupArticle>
        <Input autoComplete="false" name="standoff_id" placeholder={other?.yourStandoffId} width="100%" />
        <Button color="yellow">{other?.submit}</Button>
        <div className="bonus-3k-overlap">
          <div className="bonus-3k-overlap__circle">
            <SVGStar />
          </div>
          <h3>{payload.me && other?.[payload.me.status]}</h3>
        </div>
      </form>
      <div className="bonus-3k__participants">
        <PlayerList name="loadMore" count={payload.count_list} title={other?.activePlayers} list={payload.list} />
        <PlayerList name="loadMoreWinner" count={payload.count_winnerList} title={other?.lastWinners} list={payload.winnerList} />
      </div>
    </>
  )
}

export type BonusPlayerType = {
  id: number
  user: Person
}

export interface PlayerListProps {
  title?: string
  name: "loadMore" | "loadMoreWinner"
  list: BonusPlayerType[]
  count: number
}

function PlayerList(props: PlayerListProps) {
  const DISPLAYED_PLAYERS = 9
  return (
    <div className="player-list" onClick={() => Popup.open(PlayersListPopup, props)}>
      <h3>{props.title}</h3>
      <div className="player-list__container">
        {[...props.list, ...Array(DISPLAYED_PLAYERS)].slice(0, DISPLAYED_PLAYERS).map(player => (
          player?.user?.photo ? (
            <img className="player-list__player" src={player.user.photo} />
          ) : (
            <div className="player-list__player" />
          )
        ))}
        {/* <div className="player-list__player" /> */}

        {props.list.length >= DISPLAYED_PLAYERS && (
          <div className="player-list-counter">
            <span className="player-list-counter__number">+{props.count - DISPLAYED_PLAYERS}</span>
          </div>
        )}
      </div>
      {/* <img src="" alt="" className="player-list__avatar"/> */}
    </div>
  )
}
