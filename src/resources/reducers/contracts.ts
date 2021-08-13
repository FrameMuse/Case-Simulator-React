/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { WeaponDropProps } from "../interfaces/weapon"

type Action = { type: "CONTRACT/ADD" | "CONTRACT/CLEAR", payload: typeof initState } | { type: "CONTRACT/REMOVE", payload: number[] }

const initState: WeaponDropProps[] = []

export default (state = initState, action: Action) => {
  switch (action.type) {

    case "CONTRACT/ADD":
      return [...state, ...action.payload].slice(0, 8)

    case "CONTRACT/CLEAR":
      return []

    case "CONTRACT/REMOVE":
      return state.filter(drop => !action.payload.includes(drop.id))

    default:
      return state
  }
}
