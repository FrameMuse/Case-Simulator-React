/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { PriceRange } from "../../app/helpers/PriceRange"
import { ValueOf } from "../interfaces/Object"

interface Filters {
  search: string
  fromToRange: PriceRange | null
  hasBonusOnly: boolean
  menuChoice: string[]
}

type Action = { type: "SET_FILTERS", payload: Partial<Filters> } | { type: "SET_FILTERS_MENU_CHOICE", payload: string }

// Default
const initState: Filters = {
  search: "",
  fromToRange: null,
  hasBonusOnly: false,
  menuChoice: []
}

export default (state = initState, action: Action) => {
  switch (action.type) {

    case "SET_FILTERS":
      return { ...state, ...action.payload }

    case "SET_FILTERS_MENU_CHOICE":
      return {
        ...state,
        menuChoice: state.menuChoice.includes(action.payload) ? state.menuChoice.filter(choice => choice !== action.payload) : [...state.menuChoice, action.payload]
      }

    default:
      return state
  }
}

export const setFilter = (key: keyof Filters, value: ValueOf<Filters>) => ({
  type: "SET_FILTERS",
  payload: { [key]: value }
})

export const setMenuChoice = (value: string) => ({
  type: "SET_FILTERS_MENU_CHOICE",
  payload: value
})
