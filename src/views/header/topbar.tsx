/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SCSS
import "../../assets/scss/views/topbar.scss"
// STAFF
import LangSelector from "../../app/components/UI/LangSelector"
import { StandoffLogo } from "../../app/components/UI/Logo"
import TopbarProfile from "./topbar_profile"
import Tumbler from "app/components/UI/Tumbler"
import { QuestionMark } from "views/wheel"
import Hint from "app/components/UI/Hint"
import { useDispatch, useSelector } from "react-redux"
import { switchMode } from "resources/reducers/modes"
import useTranslation from "resources/hooks/useTranslation"
import Popup from "app/controllers/Popup"
import AuthPopup from "app/components/popup/common/AuthPopup"
import BrowserHistory from "resources/stores/BrowserHistory"

function Topbar() {
  const user = useSelector(state => state.user)
  const modes = useSelector(state => state.modes)
  const topbar = useTranslation(trans => trans.header.topbar)
  const dispatch = useDispatch()
  function toggleDemo(state: number) {
    if (!user.authed) {
      Popup.open(AuthPopup)
      return 0
    }

    !state && BrowserHistory.push("/")

    dispatch(switchMode("demo", Boolean(state)))
  }
  return (
    <div className="topbar">
      <div className="topbar__section">
        <StandoffLogo />
        <LangSelector />
        <div className="topbar-demo">
          <Tumbler type="1" value={Number(modes.demo)} onChange={toggleDemo} />
          <span className="topbar-demo__text">{topbar.demo?.title}</span>
          <QuestionMark />
          <Hint y="4em" bottom>
            <p>
              {topbar.demo?.desc}
            </p>
          </Hint>
        </div>
      </div>
      <TopbarProfile />
    </div>
  )
}

export default Topbar
