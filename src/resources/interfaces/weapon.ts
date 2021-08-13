/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

export type WeaponRarity = "common" | "uncommon" | "rare" | "epic" | "legendary" | "arcane"
export interface WeaponPreviewProps {
  title: string
  image: string
  rarity: WeaponRarity
}


export interface WeaponItemProps {
  id: number
  name: string
  price: number
  hidden: number // Boolean
  subname: string
  StatTrack: number // Boolean
  class_name: WeaponRarity
}

// Drop
export interface WeaponDropProps {
  id: number
  type: number
  status: number
  item: WeaponItemProps
  case_id?: number
  updated_at?: string // ISO Date
}
