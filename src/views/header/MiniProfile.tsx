/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SCSS
import "../../assets/scss/components/mini-profile.scss"
// SVG
import { ReactComponent as BellSVG } from "../../assets/svg/bell.svg"
import { ReactComponent as ExitSVG } from "../../assets/svg/exit.svg"
// STAFF
import Status from "app/components/UI/Status"
import { User } from "../../resources/interfaces/user"
import { Link } from "react-router-dom"
import Newsboard from "./Newsboard"
import { useState } from "react"
import LevelImage from "app/components/UI/LevelImage"

function MiniProfile(user: User) {
  return (
    <div className="mini-profile">
      <ProfileBell />
      <div className="mini-profile__image">
        <img src={user.photo} alt="user avatar" className="mini-profile__avatar" />
        <div className="mini-profile__level">
          <LevelImage type="filled" level={user.lvl} />
        </div>
        <Link className="ghost" to="/profile" />
      </div>
      <div className="mini-profile__icon" onClick={() => window.location = process.env.REACT_APP_SITE_AUTH_URL + "/logout" as any}>
        <ExitSVG />
      </div>
    </div>
  )
}

function ProfileBell() {
  const [show, setShow] = useState(false)
  return (
    <>
      <div className="mini-profile__icon" onClick={() => setShow(!show)}>
        <BellSVG />
        <Status active={Boolean(Math.floor(Math.random() * 5))} />
      </div>
      {show && <Newsboard />}
    </>
  )
}

export default MiniProfile

