/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { WeaponItemProps } from "resources/interfaces/weapon"
import { classWithModifiers, getWeaponImage } from "resources/utils"
import TriangleSVG from "assets/svg/triangle"

export default function WeaponImage(props: Partial<Pick<WeaponItemProps, "id" | "class_name">> & { children?: any; disabled?: boolean }) {
  return (
    <div className={classWithModifiers("weapon-image", [props?.class_name?.toLowerCase()])}>
      <div className="weapon-image__triangle">
        <TriangleSVG />
      </div>
      <img src={getWeaponImage(props?.id || 0)} alt="weapon" className={classWithModifiers("weapon-image__image", [props.disabled && "disabled"])} />
      {props.children}
    </div>
  )
}
