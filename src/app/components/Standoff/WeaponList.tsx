/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// STAFF
import { WeaponItemProps } from "../../../resources/interfaces/weapon"
import Weapon, { WeaponProps } from "./Weapon"

interface WeaponsListProps {
  action?: WeaponProps["action"]
  items: WeaponItemProps[]
  maxHeight?: string
  exept?: number[]
}

function WeaponList({ items, maxHeight, action, exept }: WeaponsListProps) {
  return (
    <div className="weapons-container" style={{ maxHeight }}>
      {items.map((item, index) => !exept?.includes(item.id) && (
        <Weapon action={action} item={item} key={"weapon_key_" + index} />
      ))}
    </div>
  )
}

export default WeaponList
