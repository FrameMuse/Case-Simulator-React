/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { view } from "app/Router"
import { useSelector } from "react-redux"
import { Route } from "react-router"

export default () => {
  const View = view<{ caseId: number; isBonus: boolean }>("case")
  const caseId = useSelector(state => state.user.bonusCase?.case_id || 0)
  return (
    <Route render={props => <View {...props} match={{ ...props.match, params: { caseId, isBonus: true } }} />} />
  )
}
