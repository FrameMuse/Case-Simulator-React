/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SCSS
import "assets/scss/popups/level-desc.scss"
// IMAGES
// STAFF

export default function LevelDescPopup() {
  return <></>
}

function LevelDescWay(props: { icon: any; title?: string; xp: string | number }) {
  return (
    <div className="level-desc-way">
      <div className="level-desc-way__circle">{props.icon}</div>
      <div className="level-desc-way__title">{props.title}</div>
      <div className="level-desc-way__xp">+{props.xp}XP</div>
    </div>
  )
}
