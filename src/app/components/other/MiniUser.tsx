/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SCSS
import "../../../assets/scss/components/mini-user.scss"
// STAFF
import { useSelector } from "react-redux"
import { Link as a } from "react-router-dom"
import { LevelInfo, Person, User } from "../../../resources/interfaces/user"
import LevelImage from "../UI/LevelImage"
import useTranslation from "resources/hooks/useTranslation"

export default function MiniUser({ user: EUser }: { user?: Person & LevelInfo }) {
  const trans = useTranslation(trans => trans.general)
  const user = useSelector(state => ({ ...state.user, ...EUser }))
  return (
    <div className="mini-user">
      <div className="mini-user__image">
        <img src={user.photo} alt="user photo" className="mini-user__photo" />
        <div className="mini-user__level">
          <LevelImage type="filled" level={user.lvl} />
        </div>
      </div>
      <div className="mini-user__info">
        <div className="mini-user__name">
          {user.getFullName()}
          <sup> ID{user.id}</sup>
        </div>
        {Boolean(user.link) && (
          <a rel="noopener noreferrer" target="_blank" className="mini-user__link" href={user.link!}>{trans.socProfile}</a>
        )}
      </div>
    </div>
  )
}

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
