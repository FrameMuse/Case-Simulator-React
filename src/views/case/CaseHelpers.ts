import { WeaponItemProps, WeaponDropProps } from "resources/interfaces/weapon"
import { randomInt } from "resources/utils/random"

let dropId = 0
export function getRandomDrop(weapons: WeaponItemProps[]): WeaponDropProps {
  const randomWeaponIndex = randomInt(0, weapons.length - 1)
  const randomWeapon = weapons[randomWeaponIndex]
  const drop = {
    id: dropId,
    status: 0,
    type: 0,
    item: randomWeapon
  }

  dropId++

  return drop
}