/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SCSS
import "../../assets/scss/views/profile/level.scss"
// STAFF
import { useSelector } from "react-redux"
import { LevelInfo, Person } from "../../resources/interfaces/user"
import LevelImage from "app/components/UI/LevelImage"
import Popup from "app/controllers/Popup"
import LevelDescPopup from "app/components/popup/common/LevelDescPopup"
import { LevelProgress } from "app/components/other/BonusLevel"
import useTranslation from "resources/hooks/useTranslation"

export default function Level({ user: EUser }: { user?: Person & LevelInfo }) {
  const trans = useTranslation(trans => trans.views.profile.branch.level)
  const user = useSelector(state => ({ ...state.user, ...EUser }))
  const modes = useSelector(state => state.modes)
  if (modes.demo) {
    return null
  }
  const { progress, nextExp } = new LevelProgress(user.lvl, user.exp)
  return (
    <div className="profile-level">
      <div className="profile-level-line">
        <div className="profile-level-line__progress" style={{ "--profile-level-progress": progress }} />

        <div className="profile-level__info">
          <div className="profile-level__current">{trans.level} {user.lvl}</div>
          <button className="profile-level__link" onClick={() => Popup.open(LevelDescPopup)}>{trans.learnMore}</button>
          <div className="profile-level__exp"><em>{user.exp} XP</em> из <em>{nextExp.toLocaleString()} XP</em></div>
          {/* <div className="profile-level__next">Уровеня {user.lvl + 1}</div> */}
        </div>
      </div>
      <div className="profile-level__level">
        <LevelImage level={user.lvl + 1} />
      </div>
    </div>
  )
}
