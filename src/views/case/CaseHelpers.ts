import { WeaponItemProps, WeaponDropProps } from "resources/interfaces/weapon"
import { randomInt } from "resources/utils/random"
import shuffleArray from "resources/utils/shufle"

let dropId = 0
export function createRandomDrop(weapons: WeaponItemProps[]): WeaponDropProps {
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

// Scrolling
const MAX_ITEMS_AMOUNT = 50
export function shuffleWeaponItems(items: WeaponItemProps[]) {
  const shuffledItems: WeaponItemProps[] = []
  while (shuffledItems.length <= MAX_ITEMS_AMOUNT) {
    shuffledItems.push(...shuffleArray(items).slice(0, MAX_ITEMS_AMOUNT))
  }
  return shuffledItems
}

export function getWeaponScrolls(drops: WeaponDropProps[], weapons: WeaponItemProps[], putIndex: number) {
  const weaponScrolls = drops.map(drop => {
    const shuffledWeapons = shuffleWeaponItems(weapons)
    shuffledWeapons.splice(putIndex, 0, drop.item)
  })

  return weaponScrolls
}