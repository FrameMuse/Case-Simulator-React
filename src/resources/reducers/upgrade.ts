/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { WeaponDropProps, WeaponItemProps } from "../interfaces/weapon"

// export const UPGRADE_SET = 'UPDATE/SET'

interface payload {
  drop?: WeaponDropProps
  weapon?: WeaponItemProps
}

export default (state: payload = {}, { type, payload }: { type: string, payload: payload }) => {
  switch (type) {

    case "UPDATE/SET":
      return { ...state, ...payload }

    case "UPDATE/CLEAR":
      return {}

    default:
      return state
  }
}

// export const setUpgradeWeapon = (weapon: WeaponProps) => ({
//   type: UPGRADE_SET,
//   payload: {
//     weapon
//   }
// })

// export const setInventoryDrop = (drop: Drop) => ({
//   type: UPGRADE_SET,
//   payload: {
//     drop
//   }
// })
