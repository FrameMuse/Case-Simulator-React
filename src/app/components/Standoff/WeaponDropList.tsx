/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { WeaponDropProps } from "../../../resources/interfaces/weapon"
import Weapon, { WeaponProps } from "./Weapon"

interface WeaponDropListProps {
  action?: WeaponProps["action"]
  drops: WeaponDropProps[]
  maxHeight?: string
  exept?: number[]
}

function WeaponDropList({ drops, maxHeight, action, exept }: WeaponDropListProps) {
  return (
    <div className="weapons-container" style={{ maxHeight }}>
      {drops.map((drop, index) => !exept?.includes(drop.id) && (
        <Weapon action={action} {...drop} key={"weapon_key_" + index} />
      ))}
    </div>
  )
}

export default WeaponDropList
