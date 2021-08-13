/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

export interface UserEnhancments {
  getFullName(): string
  getStandoffPhoto(): string
  getLevelProgress(): number
}

export interface LevelInfo {
  exp: number
  lvl: number
}

export interface Person {
  id: number
  photo: string
  firstname: string
  lastname: string
}

export interface ReferalInfo {
  referal: number | null
  referal_balance: number
}

export interface GameStats {
  battles: number
  bestItemId: number
  cases: number
  contracts: number
  profit_day: number
  upgrades: number

  battles_win: number
  battles_lose: number
  battles_draw: number
}

export interface VKStats {
  vkgroup: number
  vksms: number
}

export interface OtherGeneralInfo {
  wheel_type: number
  wheelCount?: number
  bonusCase: {
    case_id: number
    cooldown: number
    enabled: number // Boolean
    open: number // Boolean
    id: number
    limit: number
    started_at: string | null
    value: number
  } | null
  cashback: {
    end: string
    value: number
  } | null
  exps: {
    case: number
    battle: number
    upgrade: number
    contract: number
  }
  link: string | null
}

export interface Client {
  authed: boolean
  balance: number
  demo_balance: number
  bonus_balance: number
  account_type: number
  access_level: "default" | "admin" | "moderator"
  standoff_photo: string | null
}

export interface User extends Person, LevelInfo, Client, ReferalInfo, VKStats, OtherGeneralInfo { }
