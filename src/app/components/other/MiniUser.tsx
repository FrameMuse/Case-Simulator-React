/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SCSS
import "../../../assets/scss/components/mini-user.scss"
// STAFF
import { Person } from "../../../resources/interfaces/user"
import LevelImage from "../UI/LevelImage"

interface MiniUserTemplateProps {
  user: Person & { lvl?: number }
  status?: string
}

export function MiniUserTemplate({ user, status }: MiniUserTemplateProps) {
  return (
    <div className="mini-user">
      <div className="mini-user__image">
        <img src={user.photo} alt="avatar" className="mini-user__photo" />
        {Boolean(user.lvl) && (
          <div className="mini-user__level">
            <LevelImage type="filled" level={user.lvl!} />
          </div>
        )}
      </div>
      <div className="mini-user__info">
        <div className="mini-user__name">{user.firstname} {user.lastname}</div>
        {status && <div className="mini-user__status">{status}</div>}
      </div>
    </div>
  )
}
