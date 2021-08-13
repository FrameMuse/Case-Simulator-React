/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SCSS
import "../../../assets/scss/components/logo.scss"
// IMAGES
import StandoffLogoCase from "assets/images/logo/case.png"
import StandoffLogoText from "assets/images/logo/text.png"
// STAFF
import { Link } from "react-router-dom"

export default function Logo({ url = "/assets/images/logos/standoffcase.png", link = "/", unlink = false }) {
  return (
    <div className="logo">
      <img
        src={url}
        alt={"logo"}
        className="logo__image"
      />
      {!unlink && <Link className="ghost" to={link} />}
    </div>
  )
}

export function StandoffLogo() {
  return (
    <div className="standoff-logo">
      <img className="standoff-logo__text" src={StandoffLogoText} alt="standoff" />
      <img className="standoff-logo__case" src={StandoffLogoCase} alt="case" />
      <Link className="ghost standoff-logo__link" to="/" />
    </div>
  )
}
