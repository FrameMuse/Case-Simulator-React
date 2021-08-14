/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { BonusPlayerType, PlayerListProps } from "app/components/popup/common/Bonus3kPopup"
import { BonusTaskProps } from "app/components/popup/common/BonusSinglePopup"
import { ContractBoxProps } from "app/components/Standoff/ContractBox"
import { NewsboardElementProps } from "views/header/Newsboard"
import { WheelRequest } from "views/wheel"
import { Filters } from "../../resources/interfaces/game"
import { PaginationType } from "../../resources/interfaces/Object"
import { Person, User } from "../../resources/interfaces/user"
import { WeaponDropProps, WeaponItemProps } from "../../resources/interfaces/weapon"
import { CreateQuery } from "../../resources/utils"
import { BattleResponse } from "../../views/battle/battle"
import { BattleCase } from "../../views/battles"
import { UserStatsStats } from "../components/other/UserStats"
import { BattleBoxProps } from "../components/Standoff/BattleBox"
import { UpgradeProps } from "../components/Standoff/UpgradeBox"
import { Action } from "./client"
import { CreateContractRequest, DefaultPostRequest, GetCasePageRequest, GetCasesRequest, getInventoryRequest, OpenCaseRequest, SellItemRequest, TopUserRequest, UserRewardsRequest } from "./requests"

export const fetchDailyTop: Action<{ users: TopUserRequest[] }> = {
  endpoint: "/top/day",
  method: "GET",
}
export const fetchTotalTop: Action<{ users: TopUserRequest[] }> = {
  endpoint: "/top/all",
  method: "GET",
}



export const getCases: Action<GetCasesRequest> = {
  endpoint: "/case/list",
  method: "GET",
}



export const getUserInfo: Action<User> = {
  method: "GET",
  endpoint: "/user/info",
  cache: "no-cache"
}


// Upgrades

export const fetchUpgrades = (userId: number) => ({
  method: "GET",
  endpoint: "/user/" + userId + "/upgrades",
}) as Action<PaginationType<Array<UpgradeProps>>>

export const fetchUpgradesList = (filters?: Partial<Filters>) => ({
  method: "GET",
  endpoint: "/upgrade/items" + (filters ? ("?" + CreateQuery({
    ...filters,
    minPrice: filters.minPrice! < 14 ? 14 : filters.minPrice
  })) : ""),
}) as Action<{
  bonus_chance: number
  count: number
  items: PaginationType<WeaponItemProps[]>
}>

export const fetchOnetimeBonus: Action<{
  list: BonusTaskProps[]
}> = {
  method: "GET",
  endpoint: "/bonus/onetime/info",
}

export const fetchOnetimeBonusActivation = (id: number) => ({
  method: "POST",
  endpoint: "/bonus/onetime/" + id,
}) as Action


export const fetchPaymentCreate = (body: {
  // type: PaySystemProps["send"]["type"]
  // method: PaySystemProps["send"]["method"]
  amount: number
  bonus?: number
  promocode?: string | number
  phone?: number
}) => ({
  method: "POST",
  endpoint: "/payment/create",
  body
}) as Action<{
  url: string
}>

// Battle

export const fetchBattlesList: Action<{
  active: number
  total: number
  free: {
    create: number | null
    enter: number | null
  }
  userStats: UserStatsStats
  cases: BattleCase[]

}> = {
  method: "GET",
  endpoint: "/battle/list",
}

export const fetchBattles = (userId: number) => ({
  method: "GET",
  endpoint: "/user/" + userId + "/battles",
}) as Action<PaginationType<BattleBoxProps[]>>

export const fetchBattleInfo = (case_id: number) => ({
  method: "GET",
  endpoint: "/battle/get/" + case_id,
}) as Action<{
  battle: BattleResponse
  items: Array<WeaponItemProps>
}>

export const fetchBattleCreate = (case_id: number) => ({
  method: "POST",
  endpoint: "/battle/create",
  body: {
    case_id
  }
}) as Action<{ battle_id: number }>

export const fetchGetDemo: Action = {
  method: "POST",
  endpoint: "/user/get/demo",
}

export const fetchBattleCancel = (id: number) => ({
  method: "POST",
  endpoint: "/battle/cancel",
  body: {
    id
  }
}) as Action<{ id: number }>

export const fetchBattleJoin = (case_id: number) => ({
  method: "POST",
  endpoint: "/battle/join",
  body: {
    case_id
  }
}) as Action<{
  battle_id: number
  status: number
  ownerItem: WeaponDropProps
  opponentItem: WeaponDropProps
}>

export type getActionT<A extends Action, T = any> = A extends Action<infer T> ? T : never

// Wheel

export const fetchWheelItems: Action<WheelRequest> = {
  method: "GET",
  endpoint: "/wheel/items",
}

export const fetchWheelSpin = (id: number) => ({
  method: "POST",
  endpoint: "/wheel/spin",
  body: {
    id
  }
}) as Action<{ id: number }>

export const fetchWheelPromocode = (promocode: string | number) => ({
  method: "POST",
  endpoint: "/wheel/promocode",
  body: {
    promocode
  }
}) as Action

// Withdraw

export const fetchWithdrawItems: Action<WeaponItemProps[]> = {
  method: "GET",
  endpoint: "/withdraw/items",
}

export const fetchWithdrawCreate = (id: number, item_id: number, randomPrice: number) => ({
  method: "POST",
  endpoint: "/withdraw/create",
  body: {
    id,
    item_id,
    randomPrice
  }
}) as Action

export const fetchWithdrawCancel = (id: number) => ({
  method: "POST",
  endpoint: "/withdraw/cancel",
  body: {
    id
  }
}) as Action

export const fetchWithdrawNotify = (id: number) => ({
  method: "POST",
  endpoint: "/withdraw/notify",
  body: {
    id
  }
}) as Action

// Image

export const fetchUploadAvatar = (file: Blob) => ({
  method: "POST",
  endpoint: "/user/avatar/upload",
  body: {
    file
  }
}) as Action

// News

export const fetchNewsList = (lang: string) => ({
  method: "GET",
  endpoint: "/news/get/" + lang,
}) as Action<NewsboardElementProps[]>














// Referal

export const fetchReferalInfo: Action<{
  count: number
  list: Array<Person & { allbalance: number; referal_balance: number }>
  lvls: Array<{
    exp: number
    level: number
    money: number
    percent: number
  }>
  user: {
    balance: number
    code: string
    exp: number
    level: number
  }
}> = {
  method: "GET",
  endpoint: "/ref/info"
}

export const fetchReferalCodeUpdate = (code: string) => ({
  method: "POST",
  endpoint: "/ref/update",
  body: {
    code
  }
}) as Action<{

}>

export const fetchReferalCodeActive = (code: string) => ({
  method: "POST",
  endpoint: "/ref/active",
  body: {
    code
  }
}) as Action<{
  success: boolean
}>






export const fetchBonusActivation = (item_id: number) => ({
  method: "POST",
  endpoint: `/bonus/${item_id}/active`
}) as Action<{ success: boolean; case_id: number }>

export const fetchPaymentPromocode = (promocode: string | number) => ({
  method: "GET",
  endpoint: "/payment/promocode?code=" + promocode
}) as Action<{ percent: number }>

// Profile

export const fetchUserProfile = (userId: number) => ({
  method: "GET",
  endpoint: "/user/profile/" + userId,
}) as Action<Person & {
  lvl: number
  exp: number
}>

export const fetchPaymentBonuses: Action<{
  id: number
  item: {
    id: number
    condition: number
  }
}[]> = {
  method: "GET",
  endpoint: "/payment/bonuses"
}

export const fetchPaymentHistory: Action<PaginationType<Array<{
  id: number
  amount: number
  recieved_amount: number
  status: number
  updated_at: string // ISO Date
}>>> = {
  method: "GET",
  endpoint: "/payment/history"
}

export const getUserStats = (userId: number) => ({
  method: "GET",
  endpoint: "/user/" + userId + "/stats",
}) as Action<UserRewardsRequest>

export const getUserContracts = (userId: number) => ({
  method: "GET",
  endpoint: "/user/" + userId + "/contracts",
} as Action<PaginationType<Array<{
  item_list: ContractBoxProps["weaponList"]
  win_item: WeaponItemProps
  price: number
}>>>)

export const getUserInventory = (id: number, type: "active" | "history", filters?: Partial<Filters>) => ({
  method: "GET",
  endpoint: "/user/" + id + "/inventory/" + type + (filters ? "?" + CreateQuery(filters) : ""),
} as Action<getInventoryRequest>)

export const getUserInventoryFactory = (id: number, type: "active" | "history") => {
  return (filters?: Partial<Filters>) => getUserInventory(id, type, filters)
}

// export const getUserRewards = (userId: number) => ({
//   method: "GET",
//   endpoint: "/user/" + userId + "/stats",
// } as Action<UserRewardsRequest>)

export const fetchDailyBonus: Action<{
  bonus: {
    progress: number
    value: number
    timer: number
  }
}> = {
  method: "GET",
  endpoint: "/bonus/everyday/info"
}

export const fetchDailyBonusRecieve: Action<{
  success: boolean
}> = {
  method: "POST",
  endpoint: "/bonus/everyday/get"
}

export const fetchGiveawayInfo: Action<{
  time: string // Date ISO
  me: {
    id: number
    user_id: number
    status: "nothing" | "moderation" | "confirmed"
  } | null
  list: BonusPlayerType[]
  winnerList: BonusPlayerType[]
  count_list: number
  count_winnerList: number
}> = {
  method: "GET",
  endpoint: "/bonus/giveaway/info"
}

export const fetchGiveawaySave = (standoff_id: number) => ({
  method: "POST",
  endpoint: "/bonus/giveaway/save",
  body: {
    standoff_id
  }
}) as Action

export const fetchGiveawayLoadMore = (offset: number, name: PlayerListProps["name"] = "loadMore") => ({
  method: "GET",
  endpoint: `/bonus/giveaway/${name}?offset=` + offset,
}) as Action<{
  list: BonusPlayerType[]
  more: boolean
}>

export const fetchUserLvls: Action<{
  tickets: Array<{
    id: number
    value: number
    condition: number
  }>
}> = {
  method: "GET",
  endpoint: "/user/lvls"
}

export const createTicket = (title: string, msg: string) => ({
  method: "POST",
  endpoint: "/ticket/create",
  body: {
    title,
    msg
  }
} as Action<{
  id: number
  user_id: number
  title: string
  created_at: string
}>)



export const ticketSend = (id: number, msg: string) => ({
  method: "POST",
  endpoint: "/ticket/send",
  body: {
    id,
    msg
  }
} as Action<DefaultPostRequest>)



export const postUpgradeWeapon = (selectItem: number, bodyOverload: { amount?: number, id?: number }) => ({
  method: "POST",
  endpoint: "/upgrade/start",
  body: {
    selectItem,
    ...bodyOverload
  }
} as Action<{
  item: WeaponDropProps
  success: boolean
  winNum: number
  garant: number
}>)




export const getCasePage = (caseId: number) => ({
  method: "GET",
  endpoint: "/case/get/" + caseId,
} as Action<GetCasePageRequest>)



export const openCase = (caseId: number, multiplier: number, fast?: boolean, demo?: boolean, bonus?: boolean) => ({
  method: "POST",
  endpoint: "/case/open/" + (demo ? "demo/" : "") + (bonus ? ("bonus/" + caseId) : (caseId + "/" + multiplier)),
  body: {
    fast
  }
} as Action<OpenCaseRequest>)


export const postCreateContract = (ids: number[]) => ({
  method: "POST",
  endpoint: "/contract/create",
  body: {
    ids
  },
} as Action<CreateContractRequest>)

export const fetchMaxContractDrop = (ids: number[]) => ({
  method: "POST",
  endpoint: "/contract/maxItem ",
  body: { ids },
} as Action<WeaponItemProps>)



// Weapon

export const postSellItem = (ids: number[] | null, type: "all" | "ids") => ({
  method: "POST",
  endpoint: "/item/sell",
  body: {
    ids,
    type
  },
} as Action<SellItemRequest>)















// Писать суда

// Sample
// export const fetch[Название Реквества] = (ids: number[] | null, type: "all" | "ids") => ({
//   method: "POST",
//   endpoint: "/item/sell",
//   body: { ids, type },
// } as Action<{
//   gat: string
//   pizdec: number
//   pagination: PaginationType<{
//     lolipoop: "hueta" | "anal" | null
//   }>
//   weapon: WeaponProps
//   drop: Drop
//   weaponsArray: Array<WeaponProps>
// }>);

export const fetchCaseOpen = (id: number) => ({
  method: "GET",
  endpoint: "/case/open/" + id,
} as Action<{
  ownerAsd: Array<WeaponItemProps>
}>)
