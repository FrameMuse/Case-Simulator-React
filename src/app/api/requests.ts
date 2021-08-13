/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { CaseOpenState, CasePreviewProps, CasesListProps } from "../../resources/interfaces/case"
import { PaginationType } from "../../resources/interfaces/Object"
import { GameStats, User } from "../../resources/interfaces/user"
import { WeaponDropProps, WeaponItemProps } from "../../resources/interfaces/weapon"
import { TicketChatMessage } from "../../views/support/Tickets"

export interface DefaultPostRequest {
  status: number
}

export interface CreateContractRequest {
  created_at: string
  id: number
  item: WeaponItemProps
  item_id: number
  status: number
  type: number
  user_id: number
}

export interface SellItemRequest {
  error: number // Deprecated
}

export interface OpenCaseRequest {
  items: WeaponDropProps[]
}

export interface GetCasePageRequest {
  case: {
    id: number
    price: number
    free_count: number
    payForBonus: number // Boolean
    time: number
  } & CaseOpenState
  items: WeaponItemProps[]
}

export interface GetCasesRequest {
  themes: string[]
  lists: CasesListProps[]
  bonusCase: CasePreviewProps
}

export interface getInventoryRequest {
  contractItems: WeaponDropProps[]
  withdrawNotify: Array<{
    drop_id: number
    name: string
  }>
  items: PaginationType<WeaponDropProps[]>
  sum: number
}

export type GetTicketsListRequest = Array<{
  id: number
  created_at: string
  messages: Array<TicketChatMessage>
  status: number
  title: string
}>

export interface UserRewardsRequest {
  items: number
  bonuses: number
  rewards: {
    battles: {
      win: number
      lose: number
      draw: number
    }
    bestCase: {
      id: number
    }
    bestCaseBattles: {
      id: number
    }
    bestItemCases: WeaponItemProps
    bestItemBattles: WeaponItemProps
    bestItemUpgrades: WeaponItemProps
    bestItemContracts: WeaponItemProps
    cases: number
    contracts: number
    upgrades: {
      win: number
      lose: number
    }
  }
}

export interface TopUserRequest extends Pick<User, "id" | "firstname" | "lastname" | "photo">, GameStats {
  profit: number
  place: number
}

// export asd 
// export asd 
// export asd 
