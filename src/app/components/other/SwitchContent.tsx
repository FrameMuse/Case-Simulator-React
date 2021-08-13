/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SCSS
import "../../../assets/scss/components/switch-content.scss"
// STAFF
import { Fragment, ReactElement, useEffect, useState } from "react"
import { classWithModifiers } from "../../../resources/utils"

interface SwitchContentProps {
  menu: string | string[]
  type?: "dependent" | "custom-content"
  style?: string
  defaultValue?: string
  children: ReactElement<SwitchContentRouteProps>[]
}

interface SwitchContentRouteProps {
  path?: string
  hint?: any
  children: any
}

export default function SwitchContent({ menu: rawMenu, type, style, defaultValue, children }: SwitchContentProps) {
  const menu = typeof rawMenu === "string" ? rawMenu.split(", ") : rawMenu
  const [items, setItems] = useState(menu)
  const [choice, Choose] = useState(defaultValue || items[0])

  useEffect(() => setItems(menu), [menu])

  return (
    <div className={classWithModifiers("switch-content", [type])}>
      <div className={classWithModifiers("switch-content-menu", [style])}>
        {items.map((item, index) => (
          <div className={classWithModifiers("switch-content-menu__link", [item === choice ? "active" : null])} onClick={() => Choose(item)} key={"switch_link_" + index}>
            <div className="switch-content-menu__text">{item}</div>
            {children[index]?.props?.hint && <span className="switch-content-menu__hint">{children[index].props.hint}</span>}
          </div>
        ))}
      </div>
      <div className="switch-content__container">
        {children.filter(child => child.props.path === choice)}
      </div>
    </div>
  )
}

export function SwitchContentRoute({ path, children }: SwitchContentRouteProps) {
  return <Fragment key={path}>{children}</Fragment>
}
