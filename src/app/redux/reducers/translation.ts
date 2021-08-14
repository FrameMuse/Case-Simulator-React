/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import Translation from "app/controllers/Translation"

export const UPDATE_LANG = "LANG/UPDATE"

type Action = { type: string, payload: { lang: string } }

export default (state = Translation.get(), { type, payload }: Action) => {
  switch (type) {

    case UPDATE_LANG:
      return Translation.ResolveAndSave(payload.lang.toLowerCase())

    default:
      return state
  }
}

export const updateLang = (lang: string) => ({
  type: UPDATE_LANG,
  payload: {
    lang
  }
})
