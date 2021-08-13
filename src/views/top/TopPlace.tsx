/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { classWithModifiers } from "../../resources/utils"
import { ReactComponent as SVGBG } from "../../assets/svg/pieces.svg"
import { TopUserRequest } from "app/api/requests"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import useTranslation from "resources/hooks/useTranslation"

interface TopPlaceProps {
  user: TopUserRequest
  place?: string;
}

const colors = ["yellow", "silver", "bronze"]

function TopPlace({ user, place }: TopPlaceProps) {
  const top = useTranslation(trans => trans.views.top)
  const currentUser = useSelector(state => state.user)
  const placeColor = place && colors[Number(place) - 1]
  return (
    <div className={classWithModifiers("top-place", [placeColor])}>
      <h3 className="top-place__title">{place} место</h3>
      <div className="top-place__avatar">
        <div className="top-place__bg">
          <SVGBG color="currentColor" />
        </div>
        <img src={user.photo} alt="avatar" className="top-place__image" />
        <Link className="ghost" to={"/profile/" + (user.id === currentUser.id ? "" : user.id)} />
      </div>
      <div className="top-place__user">
        <div className="top-place__name">{user.firstname} {user.lastname}</div>
        <div className="top-place__price">{user.profit.toPrice()}</div>
        <Link className="ghost" to={"/profile/" + (user.id === currentUser.id ? "" : user.id)} />
      </div>
      <div className="top-place-entries">
        <div className="top-place-entries__entry">
          <div className="top-place-entries__value">{user.cases.toLocaleString()}</div>
          <div className="top-place-entries__key">{top.stats?.cases}</div>
        </div>
        <div className="top-place-entries__entry">
          <div className="top-place-entries__value">{user.contracts.toLocaleString()}</div>
          <div className="top-place-entries__key">{top.stats?.contracts}</div>
        </div>
        <div className="top-place-entries__entry">
          <div className="top-place-entries__value">{user.battles.toLocaleString()}</div>
          <div className="top-place-entries__key">{top.stats?.battles}</div>
        </div>
        <div className="top-place-entries__entry">
          <div className="top-place-entries__value">{user.upgrades.toLocaleString()}</div>
          <div className="top-place-entries__key">{top.stats?.upgrades}</div>
        </div>
      </div>
    </div>
  )
}

export default TopPlace
