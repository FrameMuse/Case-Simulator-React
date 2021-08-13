/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SCSS
import Popup from "app/controllers/Popup"
import "assets/scss/components/bonus-case-notify.scss"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
// STAFF
import useTranslation from "resources/hooks/useTranslation"
import { getCaseImage } from "resources/utils"
import BonusCasePopup from "../popup/common/BonusCasePopup"

const TIMER_TIMEOUT = 200
export default function BonusCaseNotify() {
  const user = useSelector(state => state.user)
  const trans = useTranslation(trans => trans.popup.bonus)
  const [display, setDisplay] = useState(false)

  const [value, setValue] = useState(getTime())
  function getTime() {
    return new Date(new Date(user?.bonusCase?.started_at || 0).getTime() - Date.now())
  }
  useEffect(() => {
    const timeout = setTimeout(() => {
      setValue(getTime())
    }, TIMER_TIMEOUT)

    return () => {
      clearTimeout(timeout)
    }
  }, [getTime])

  useEffect(() => {
    if (value.getTime() > 1500 && value.getTime() < 1800) setDisplay(true)
    if (value.getTime() < 900) setDisplay(true)

    if (user.bonusCase) setDisplay(true)
  }, [user.bonusCase, value])

  if (!display || isNaN(value.getTime()) || !user.authed) {
    return null
  }

  if (user.bonusCase?.open) {
    return null
  }

  // alert(value)

  return (
    <div className="bonus-case-notify">
      <div>
        <img src={getCaseImage(user.bonusCase?.case_id || 0)} alt="case" className="bonus-case-notify__case" />
        {/* <Link className="ghost" to={"/bonus!" + BonusAccessPoint} /> */}
      </div>
      <div className="bonus-case-notify__article">
        <div className="bonus-case-notify__title">{trans.title}</div>
        {(user.bonusCase?.enabled || (value.getTime() <= 0)) ? (
          <p className="bonus-case-notify__desc">
            {trans.desc2}
          </p>
        ) : (
          <>
            <p className="bonus-case-notify__desc">
              {trans.desc1} {value.toISOString().split("T")[1].slice(0, 8)}
            </p>
          </>
        )
        }
      </div >
      <div className="bonus-case-notify__buttons">
        <div className="bonus-case-notify-mark" onClick={() => Popup.open(BonusCasePopup, { id: 1, time: "" })}>
          <span className="bonus-case-notify-mark__mark">?</span>
        </div>
        {/* <div className="bonus-case-notify-mark">
          <span className="bonus-case-notify-mark__mark">&#10006;</span>
        </div> */}
      </div>
    </div >
  )
}
