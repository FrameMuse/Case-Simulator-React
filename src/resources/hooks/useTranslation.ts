/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { useSelector } from "react-redux"
import { TranslationJSON } from "../../app/controllers/Translation"
import Price from "../../app/helpers/Price"

function useTranslation<Selected extends object = TranslationJSON>(selector?: (trans: TranslationJSON) => Selected): Partial<Selected> {
  const translation = useSelector(state => state.translation)
  const modes = useSelector(state => state.modes)

  Price.currency = translation.currency
  Price.currencyDemo = modes.demo

  if (selector) {
    return selector(translation) || {}
  }
  // @ts-expect-error
  return translation

  // // @ts-expect-error
  // return useMemo(() => {
  //   if (selector) {
  //     return selector(translation) || {}
  //   }
  //   return translation
  // }, [translation])
}

export default useTranslation
