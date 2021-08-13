/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { useSelector } from "react-redux"
import BrowserHistory from "resources/stores/BrowserHistory"

export default function useRestrictedArea(enabled = true) {
  const modes = useSelector(state => state.modes)

  if (!enabled) {
    return
  }

  // useLayoutEffect(() => {
  if (modes.demo) {
    BrowserHistory.replace("/")
  }
  // }, [modes])
}
