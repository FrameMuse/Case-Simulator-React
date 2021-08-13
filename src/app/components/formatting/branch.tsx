/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { HtmlHTMLAttributes } from "react"
import { NavLink } from "react-router-dom"

// SCSS
import "../../../assets/scss/components/branch.scss"
import { classAssign } from "../../../resources/utils"
import { Article } from "./article"

interface BranchElement {
  children?: any
  className?: string
  style?: HtmlHTMLAttributes<{}>["style"]
}

interface Branch extends BranchElement {
  children?: any
  className?: string
}

interface BranchHeader extends BranchElement {
  reverse?: boolean
  type?: "small"
  title?: any
  desc?: any
}


interface BranchLink extends BranchElement {
  status?: string | number
  to?: any
  onClick?(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void
}

export default function Branch({ id, className, children }: Branch & { id?: string }) {
  return (
    <div className={classAssign(["branch", className])} id={id}>{children}</div>
  )
}

export function BranchHeader({ title, desc, children }: BranchHeader) {
  return (
    <div className="branch__header">
      <Article className="branch-article" title={title}>{desc}</Article>
      {children}
    </div>
  )
}

export function BranchSidebar(props: BranchElement) {
  return <div {...props} className={classAssign(["branch__sidebar", props.className])} />
}

export function BranchSection({ children, style, flex }: BranchElement & { flex?: string }) {
  return (
    <div className="branch__section" style={{ ...style, flex }}>{children}</div>
  )
}

export function BranchContainer({ children, style }: BranchElement) {
  return (
    <div className="branch__container" style={style}>{children}</div>
  )
}

export function BranchNav({ children }: BranchElement) {
  return (
    <div className="branch-nav">{children}</div>
  )
}

export function BranchLink({ children, onClick, status, to }: BranchLink) {
  return (
    <NavLink exact className="branch-nav__link" activeClassName="branch-nav__link--active" to={to || {}} onClick={onClick}>
      <span className="branch-nav__text">{children}</span>
      {status !== undefined && <span className="branch-nav__status">{status}</span>}
      {/* {status && <span className="branch-nav__attention"></span>} */}
    </NavLink>
  )
}
