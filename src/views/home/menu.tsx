/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SCSS
import { useDispatch, useSelector } from "react-redux"
import "../../assets/scss/views/home-menu.scss"
// STAFF
import useTranslation from "../../resources/hooks/useTranslation"
import { setMenuChoice } from "../../resources/reducers/filters"
import { classWithModifiers } from "../../resources/utils"

interface MenuProps {
  themes: string[]
  defaultTopic: string
}

export default function Menu({ themes }: MenuProps) {
  const dispatch = useDispatch()
  const modes = useSelector(state => state.modes)
  const filters = useSelector(state => state.filters)
  const themesTranslation = useTranslation(trans => trans.themes)
  return (
    <div className="home-menu">
      <div className="home-menu__inner">
        {themes.map(topic => {
          const modifiers: string[] = []

          if (filters.menuChoice.includes(topic)) {
            modifiers.push("active")
          }

          if (modes.demo) {
            if (["free", "bonus"].includes(topic)) {
              return null
            }
          }

          return (
            <div key={"topic_id_" + topic} className={classWithModifiers("home-menu__item", modifiers)} onClick={() => dispatch(setMenuChoice(topic))}>
              <span className="home-menu__text">{themesTranslation[topic]?.title}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
