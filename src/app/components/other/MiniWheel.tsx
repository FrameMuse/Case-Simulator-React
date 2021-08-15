/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SCSS
import "../../../assets/scss/components/mini-wheel.scss"
// IMAGES
import WheelImage from "../../../assets/images/mini-wheel.png"
// STAFF
import { Link } from "react-router-dom"
import useTranslation from "resources/hooks/useTranslation"

export default function MiniWheel() {
  const trans = useTranslation(trans => trans.popup.miniWheel)
  return null
  return (
    <div className="mini-wheel">
      <div className="mini-wheel__content">
        <div className="mini-wheel__shadow" />
        <span className="mini-wheel__count">OPEN</span>
        <p className="mini-wheel__desc">{trans.desc}</p>
        <img src={WheelImage} alt="wheel image" className="mini-wheel__image" />
      </div>
      <Link className="ghost" to="/wheel/free" />
    </div>
  )
}
