/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { useContext } from "react"
import { PopupContext } from "app/components/popup/PopupProvider"
import { PopupQueue } from "app/controllers/Popup"

export default function usePopupContext() {
  const popupContext = useContext(PopupContext)

  return {
    ...popupContext,
    Component: undefined
  } as Omit<PopupQueue, "Component">
}
