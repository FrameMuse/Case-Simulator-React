/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SCSS
import { useHistory } from "react-router-dom"
import "../../../assets/scss/components/user-stats.scss"
// STAFF
import Box from "../UI/Box"
import Button from "../UI/Button"

export interface UserStatsStats {
  win: number
  lose: number
  draw: number
}

export default function UserStats(stats: Partial<UserStatsStats>) {
  const history = useHistory()
  return (
    <div className="user-stats">
      <div className="user-stats__container">
        <div className="user-stats__entries">

          <div className="user-stats__entry">
            <div className="user-stats__value">{stats.win || 0}</div>
            <div className="user-stats__key">Побед</div>
          </div>

          <div className="user-stats__entry">
            <div className="user-stats__value">{stats.lose || 0}</div>
            <div className="user-stats__key">Поражений</div>
          </div>

          <div className="user-stats__entry">
            <div className="user-stats__value">{stats.draw || 0}</div>
            <div className="user-stats__key">Ничьих</div>
          </div>

        </div>
        <Button className="user-stats__button" onClick={() => history.push("/profile/battles")}>Мои сражения</Button>
      </div>
    </div>
  )
}
