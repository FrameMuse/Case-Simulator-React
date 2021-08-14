/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SCSS
import "../../assets/scss/views/topbar.scss"
// STAFF
import LangSelector from "app/components/UI/LangSelector"
import { StandoffLogo } from "app/components/UI/Logo"

function Topbar() {
  return (
    <div className="topbar">
      <div className="topbar__section">
        <StandoffLogo />
        <LangSelector />
      </div>
    </div>
  )
}

export default Topbar
