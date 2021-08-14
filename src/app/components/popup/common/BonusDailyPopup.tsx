/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { fetchDailyBonus, fetchDailyBonusRecieve } from "app/api/actions"
import { ClientAPI } from "app/api/client"
import { LevelProgress } from "app/components/other/BonusLevel"
import { QueryProvider, useContextQuery } from "app/components/other/MutuableQuery"
import Button from "app/components/UI/Button"
import { TimerCountDown } from "app/components/UI/Timer"
import Skeleton from "app/skeletons/skeleton"
import "assets/scss/popups/bonus-daily.scss"
import { useEffect, useState } from "react"
import useAddNotify from "resources/hooks/useAddNotify"
import useTranslation from "resources/hooks/useTranslation"
import { classWithModifiers } from "resources/utils"
import { PopupArticle, PopupDefaultLayout } from "../PopupProvider"

export default function BonusDailyPopup() {
  const trans = useTranslation(trans => trans.popup.BonusDaily)
  return (
    <PopupDefaultLayout title={trans.title} rowGap="3.5em" width="62em">
      <QueryProvider action={fetchDailyBonus}>
        <section className="bonus-daily__split">
          <div className="bonus-daily__container">
            <PopupArticle heading="h3" title={trans.levelTitle}>
              {trans.levelDesc}
            </PopupArticle>
            <BonusLevel />
          </div>
          <div className="bonus-daily__container">
            <PopupArticle heading="h3" title={trans.bonusTitle}>
              {trans.bonusDesc}
            </PopupArticle>
            <BonusOfYours />
          </div>
        </section>
        <section>
          <PopupArticle heading="h3" title={trans.getBonusTitle}>
            {trans.getBonusDesc}
          </PopupArticle>
          <BonusProgress />
        </section>
        <SocketMutation />
      </QueryProvider>
    </PopupDefaultLayout>
  )
}

function BonusLevel() {
  const trans = useTranslation(trans => trans.popup.BonusDaily)
  const level = new LevelProgress(1, 2)
  return (
    <div className="bonus-daily-level">
      <div className="bonus-daily-level-shape">
        <span className="bonus-daily-level-shape__number">{level.value}</span>
      </div>

      <div className="progress-bar">
        <div className="progress-bar__line" style={{ "--progress": level.progress * 100 }} />

        <div className="progress-bar__info">
          <span className="progress-bar__text">{trans.points}</span>
          <span className="progress-bar__text">{level.exp} / {level.nextExp} XP</span>
        </div>
      </div>
    </div>
  )
}

function getSvgTextAsBackground(text: string, color = "#1c2229") {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='1.75em' height='1em' viewBox='0 0 24 24'><text style='transform: rotate(-25deg); font-weight: 800;' x='-16' y='20' fill='${color}'>${text}</text></svg>`
  const bg = `data:image/svg+xml,${encodeURIComponent(svg)}`
  return bg
}

function BonusOfYours() {
  const addNotify = useAddNotify()
  const trans = useTranslation(trans => trans.popup.BonusDaily)
  const { langCode } = useTranslation()
  const { payload, query } = useContextQuery<typeof fetchDailyBonus>()
  const [timer, setTimer] = useState(payload.bonus.timer)
  function recieveBonus() {
    ClientAPI
      .query(fetchDailyBonusRecieve)
      .then(({ error, payload }) => {
        if (error || !payload) return
        query().then(({ error, payload }) => {
          if (error || !payload) return
          setTimer(payload.bonus.timer)
          addNotify("dailyBonusUsed", "success")
        })
      })
  }
  function endTimer() {
    setTimer(0)
  }
  // useEffect(() => setTimer(payload.bonus.timer), [payload.bonus.timer])
  const background = getSvgTextAsBackground(langCode === "ru" ? "бонус" : "bonus")
  // const TIMER_NULL = (timer ?? true) || false
  const TIMER_EXISTS = timer > 0
  return (
    <div className="bonus-of-yours">
      <div className="bonus-of-yours-canvas" style={{ backgroundImage: `url("${background}")` }}>
        <span className="bonus-of-yours-canvas__price">
          {payload.bonus.value ? payload.bonus.value?.toPrice() : <Skeleton />}
        </span>
      </div>
      {/* {TIMER_NULL && <Skeleton />} */}
      {TIMER_EXISTS && (
        <Button disabled>
          <em>
            {trans.nextIn}
            <span style={{ width: "8ch", display: "inline-block" }}> <TimerCountDown simple distance={timer} onEnd={endTimer} /></span>
          </em>
        </Button>
      )}
      {!TIMER_EXISTS && (
        <Button color="yellow" onClick={recieveBonus}>{trans.button}</Button>
      )}
    </div>
  )
}

function BonusProgress() {
  const trans = useTranslation(trans => trans.popup.BonusDaily)
  const { payload } = useContextQuery<typeof fetchDailyBonus>()
  const entries = [1, 2, 3, 4, 5, 6, 7]
  return (
    <div className="bonus-progress">
      <div className="bonus-progress-lane">
        <div className="bonus-progress-lane__entries">
          {entries.map((entry, index) => (
            <div className="bonus-progress-lane-entry" key={"entry_" + index}>
              <span className={classWithModifiers("bonus-progress-lane-entry__text", [payload.bonus.progress >= entry && "active"])}>{entry}</span>
            </div>
          ))}
          <div className="bonus-progress-lane-entry">
            <div className="bonus-progress-lane-entry__cover" />
            <span className={classWithModifiers("bonus-progress-lane-entry__text", ["extra"])}>5x</span>
          </div>
        </div>
        <div className="bonus-progress-lane__progress" style={{ "--progress": payload.bonus.progress }} />
      </div>
      <p className="bonus-progress__text">
        {trans.progressText}
      </p>
    </div>
  )
}

function SocketMutation() {

  useEffect(() => {
    // ClientSocket.add()
  }, [])
  return null
}
