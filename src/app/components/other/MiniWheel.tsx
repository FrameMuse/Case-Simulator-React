/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SCSS
import "../../../assets/scss/components/mini-wheel.scss"
// IMAGES
import WheelImage from "../../../assets/images/mini-wheel.png"
import { ReactComponent as SVGBonusHeading } from "../../../assets/svg/bonus-heading.svg"
// STAFF
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import useTranslation from "resources/hooks/useTranslation"

export default function MiniWheel() {
  const user = useSelector(state => state.user)
  const { demo } = useSelector(state => state.modes)
  const trans = useTranslation(trans => trans.popup.miniWheel)

  if (demo) {
    return null
  }

  return (
    <div className="mini-wheel">
      <div className="mini-wheel__content">
        <div className="mini-wheel__shadow" />
        {user.authed && (
          <>
            <span className="mini-wheel__count">{user.wheelCount || 0}</span>
            <p className="mini-wheel__desc">{trans.desc}</p>
          </>
        )}
        {!user.authed && (
          <SVGBonusHeading className="mini-wheel__heading" />
        )}
        <img src={WheelImage} alt="wheel image" className="mini-wheel__image" />
      </div>
      <Link className="ghost" to="/wheel/free" />
    </div>
  )
}
