/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SCSS
import "../../assets/scss/views/wheel.scss"
// IMAGES
import WheelBonusesBg from "../../assets/images/wheel-bonus-bg.png"
// STAFF
import { fetchWheelItems, fetchWheelPromocode } from "../../app/api/actions"
import { QueryProvider, useContextQuery } from "../../app/components/other/MutuableQuery"
import WheelInventory from "./WheelInventory"
import WheelPage from "./WheelPage"
import useTranslation from "../../resources/hooks/useTranslation"
import { Article } from "../../app/components/formatting/article"
import { useSelector } from "react-redux"
import Input from "../../app/components/UI/Input"
import Button from "../../app/components/UI/Button"
import { Link } from "react-router-dom"
import { useState } from "react"
import DetailBonusBox from "./DetailBonusBox"
import BrowserHistory from "resources/stores/BrowserHistory"
import { ClientAPI } from "app/api/client"
import useAddNotify from "resources/hooks/useAddNotify"

export interface WheelRequest {
  list: number[]
  wheel: number[]
  time: number
  lastItem: number
  countBonuses: number
}

export default () => {
  useTranslation()
  return (
    <div className="wheel-page">
      <Header />
      <QueryProvider action={fetchWheelItems}>
        <WheelPage />
        <ExtraSection />
        <WheelInventory />
      </QueryProvider>
    </div>
  )
}

function Header() {
  const trans = useTranslation(trans => trans.views.wheel)
  const user = useSelector(state => state.user)
  return (
    <div className="wheel-page__header">
      <Article className="wheel-page-article" title={trans.title}>
        <em>
          {trans.desc}
        </em>
      </Article>
      <div className="wheel-open-counter">
        <span className="wheel-open-counter__icon icon" />
        <div className="wheel-open-counter__inner">
          <span className="wheel-open-counter__value">{user.wheelCount || 0}</span>
          <span className="wheel-open-counter__text">{trans.availableGames}</span>
        </div>
      </div>
      <div>
        <WheelPromocode />
      </div>
    </div>
  )
}

function WheelPromocode() {
  const trans = useTranslation(trans => trans.views.wheel)
  const [code, setCode] = useState<string | null>(null)
  const addNotify = useAddNotify()
  function getMore() {
    if (!code) {
      addNotify("noCodeEntered")
      return
    }

    ClientAPI
      .query(fetchWheelPromocode(code))
      .then(({ error }) => {
        if (error) return
        addNotify("promocodeAcivate", "success")
      })
  }
  return (
    <div className="wheel-promocode">
      <Input style={{ textTransform: "uppercase" }} placeholder={trans.promocodePlaceholder} onChange={event => setCode(event.currentTarget.value)} />
      <Button color="blue" onClick={getMore}>{trans.promocodeButton}</Button>
      <p className="wheel-promocode__text">
        {trans.promocodeText}
      </p>
    </div>
  )
}

function ExtraSection() {
  const trans = useTranslation(trans => trans.views.wheel)
  const { payload } = useContextQuery<typeof fetchWheelItems>()
  return (
    <div className="wheel-bonuses-section">
      <div className="wheel-your-bonuses">
        <div className="wheel-your-bonuses__counter">
          <img src={WheelBonusesBg} alt="bonus bg" className="wheel-your-bonuses__image" />
          <div className="wheel-your-bonuses__bonuses">{payload.countBonuses}</div>
        </div>
        <div className="wheel-your-bonuses__content">
          <div className="wheel-your-bonuses__title">{trans.bonusesTitle}</div>
          <p className="wheel-your-bonuses__text">
            {trans.bonusesDesc}
          </p>
          <Link className="button button--blue" to="/profile/bonuses">
            <span className="button__text">{trans.bonusesButton}</span>
          </Link>
        </div>
      </div>
      {payload.lastItem > 0 && (
        <div className="wheel-last-bonus">
          <div className="wheel-last-bonus__title">{trans.lastBonuses}</div>
          <div className="wheel-last-bonus__bonus">
            <DetailBonusBox id={payload.lastItem} onClick={() => BrowserHistory.push("/profile/bonuses")} />
          </div>
        </div>
      )}
    </div>
  )
}

export function QuestionMark() {
  return (
    <span className="question-mark">
      <span className="question-mark__mark">?</span>
    </span>
  )
}
