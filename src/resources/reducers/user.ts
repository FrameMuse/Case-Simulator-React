/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { User, UserEnhancments } from "../interfaces/user"

type Action = { type: string, payload: typeof initState }

// @ts-ignore
const initState: User & UserEnhancments & { loaded: boolean } = {
  authed: false,
  balance: 0,
  bonus_balance: 0,
  photo: "/assets/images/avatar.jpg",
  loaded: false,
  // account_type: "VK",
  // created_at: 0,
  // dist_id: 0,
  bonusCase: {
    case_id: 0,
    open: 0,
    cooldown: 0,
    enabled: 0,
    id: 0,
    limit: 0,
    started_at: null,
    value: 0
  },
  firstname: "FrameMuse",
  id: 0,
  lastname: "Фреймъюсович разработчик",
  lvl: 0,
  exp: 0,
  access_level: "admin",
  standoff_photo: null,

  getStandoffPhoto() {
    return this.standoff_photo || `https://api.standoffcase.net/avatars/` + this.id + ".png" + "?v=" + Date.now()
  },

  getFullName() {
    return this.firstname + " " + this.lastname
  },

  getLevelProgress() {
    return this.exp / 2000
  },
}

// export const CachedUserInfo = {
//   ...initState,
//   ...JSON.parse(localStorage.getItem("UserInfoCache") || "null"),
//   standoff_photo: null
// }

export default (state: User & UserEnhancments & { loaded: boolean } = initState, { type, payload }: Action) => {
  switch (type) {

    case "USER_INFO_UPDATE": {
      const newState = { ...state, ...payload }
      // Cache
      localStorage.setItem("UserInfoCache", JSON.stringify(newState))
      return newState
    }

    default:
      return state
  }
}

export const updateUserInfo = (payload: any) => ({
  type: "USER_INFO_UPDATE",
  payload
})

