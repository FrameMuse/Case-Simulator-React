/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { getInventoryRequest } from "app/api/requests"
import { WeaponDropProps } from "../interfaces/weapon"

type Action = { type: string, payload?: initState & { id: number } }

interface initState {
  items: WeaponDropProps[]
  sum: number
}

export default (state = 0, { type, payload }: Action) => {
  switch (type) {

    // case "LOCAL_INVENTORY_UPDATE":
    //   // alert(1)
    //   return state + 1

    // case "LOCAL_INVENTORY_REMOVE_ITEM":
    //   if (!state || !payload?.id) return state
    //   return {
    //     ...state,
    //     items: state.items.filter(item => item.id !== payload.id)
    //   }

    default:
      return state
  }
}
