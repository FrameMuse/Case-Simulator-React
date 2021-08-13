/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SCSS
import "../../assets/scss/components/go-up.scss"
// SVG
import { ReactComponent as SVGArrow } from "../../assets/svg/arrow.svg"

export default function GoUp() {
  return (
    <div className="go-up" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
      <div className="go-up__icon">
        <SVGArrow />
      </div>
    </div>
  )
}
