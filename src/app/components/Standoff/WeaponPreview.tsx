/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SCSS
import "../../../assets/scss/components/weapon-preview.scss"
// STAFF
import { WeaponPreviewProps } from "../../../resources/interfaces/weapon"
import { classWithModifiers } from "../../../resources/utils"
import TriangleSVG from "../../../assets/svg/triangle"

function WeaponPreview(props: WeaponPreviewProps) {
  return (
    <div className="weapon-preview">
      <TriangleSVG className={classWithModifiers("weapon-preview__rarity", [props.rarity])} />
      <img src={props.image} alt="weapon preview" className="weapon-preview__image" />
      <span className="weapon-preview__title">{props.title}</span>
    </div>
  )
}

export default WeaponPreview
