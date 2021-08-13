/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { NavLink as RouteLink } from "react-router-dom"
import NewbyMark from "../../app/components/UI/NewbyMark"
import useTranslation from "../../resources/hooks/useTranslation"
import Icon from "../../app/components/UI/Icon"
// SCSS
import "../../assets/scss/views/navigation.scss"
import { classWithModifiers } from "resources/utils"
import { useSelector } from "react-redux"

function Navigation() {
  const navigation = useTranslation(trans => trans.header.topbar.navigation)
  const { demo } = useSelector(state => state.modes)
  return (
    <nav className="navigation">
      <div className="navigation__inner">
        <NavLink to="/" exact>{navigation.home}</NavLink>
        <NavLink to="/contract" locked={demo}>{navigation.contract}</NavLink>
        <NavLink to="/upgrade" locked={demo}>{navigation.upgrade}</NavLink>
        <NavLink to="/bonuses" locked={demo}>{navigation.bonuses}</NavLink>
        <NavLink to="/top" locked={demo}>{navigation.top}</NavLink>
        <NavLink to="/battles" newby locked={demo}>{navigation.battles}</NavLink>
        <NavLink to="/support">{navigation.support}</NavLink>
        {/* {process.env.NODE_ENV === "development" && <NavLink to="/errors" newby>ER RORS</NavLink>} */}
        {/* <NavLink to="/battle_pass" locked={demo}>{navigation.battle_pass}</NavLink> */}
      </div>
    </nav>
  )
}

function NavLink(props: { locked?: boolean; to: string, newby?: boolean, exact?: boolean, icon?: string, children?: any }) {
  return (
    <RouteLink
      to={{
        pathname: props.locked ? "" : props.to,
      }}
      exact={props.exact}
      className={classWithModifiers("navigation__link", [props.locked && "locked"])}
      activeClassName="navigation__link--active"
    >
      {props.icon && <Icon name={props.icon} />}
      {props.children}
      {props.newby && <NewbyMark />}
      {props.locked && (
        <div className="navigation__lock">
          <Icon name="lock-dark" />
        </div>
      )}
    </RouteLink>
  )
}

export default Navigation
