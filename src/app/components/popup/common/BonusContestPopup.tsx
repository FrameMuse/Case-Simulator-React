/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SCSS
import "../../../../assets/scss/popups/bonus-contest.scss"
// STAFF
import { useSelector } from "react-redux"
import { MiniUserTemplate } from "../../other/MiniUser"
import Button from "../../UI/Button"
import Input from "../../UI/Input"
import { PopupDefaultLayout } from "../PopupProvider"
import AuthPopup from "./AuthPopup"
import useTranslation from "resources/hooks/useTranslation"

export default function BonusContestPopup() {
  const trans = useTranslation(trans => trans.popup.BonusContest)
  const user = useSelector(state => state.user)
  if (!user.authed) {
    return <AuthPopup />
  }
  return (
    <PopupDefaultLayout nofooter>
      <div className="bonus-contest">
        <div className="bonus-contest-header">
          <div className="bonus-contest-header__title">{trans.title}</div>
          <div className="bonus-contest-header__right">
            <span className="bonus-contest-header__text">{trans.tillEnd}</span>
            <span className="bonus-contest-header__end-time">05:13:26:33</span>
          </div>
        </div>
        <div className="bonus-contest-content">
          <div className="bonus-contest-content__application bonus-contest-content__application--hidden">
            <div className="bonus-contest-content__title">{trans.participateText}</div>
            <p className="bonus-contest-content__desc">
              {trans.desc}
            </p>
            <div className="bonus-contest-content__form">
              <Input placeholder="Ваш Standoff 2 ID" />
              <Button className="bonus-contest-content__button">{trans.participateButton}</Button>
            </div>

            <div className="bonus-contest-notify">
              <div className="bonus-contest-notify__inner">
                <h2 className="bonus-contest-notify__title">{trans.notifyTitle}</h2>
                <p className="bonus-contest-notify__text">
                  <span className="blue-color">{trans.notifyDesc}</span> <span className="bonus-contest-notify__status">{trans.notifyStatus}</span>
                </p>
              </div>
            </div>
          </div>
          <section>
            <div className="bonus-contest-content__title">{trans.infoTitle}</div>
            <MiniUserTemplate user={user} status={trans.lastWinner} />
            <MiniUserTemplate user={user} status={trans.totalPlayers} />
            <p className="bonus-contest-content__attention">
              {trans.infoDesc}
            </p>
          </section>
        </div>
      </div>
    </PopupDefaultLayout>
  )
}
