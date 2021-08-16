/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SCSS
import "assets/scss/views/case.scss"
// STAFF
import { Article } from "app/components/formatting/article"
import { ViewProps } from "resources/interfaces/router"
import useTranslation from "resources/hooks/useTranslation"
import { MutableRefObject, useEffect } from "react"
import ClientSocket from "app/socket/ClientSocket"
import CaseContainer from "./CaseContainer"
import Inventory from "./inventory"
import DataBase from "database"
import { WeaponItemProps } from "resources/interfaces/weapon"
import { getMockRandom } from "resources/utils"

export interface CaseLocationState {
  noScrollBack?: boolean
  snapshot: MutableRefObject<{
    scrollY: number
    rect?: DOMRect
  } | null>
}

export default (props: ViewProps<{ caseId: number, isBonus?: boolean }, CaseLocationState>) => {
  const { caseId } = props.match.params
  const weapons = DataBase.data.Weapons.slice(0, getMockRandom(caseId, 2)) as WeaponItemProps[]
  const caseTranslation = useTranslation(trans => trans.cases[caseId])

  useEffect(() => {
    // setTimeout(() => {
    if (props.location.state?.noScrollBack) {
      document.getElementById("case")?.scrollIntoView({
        block: "start"
      })
    }
    // }, 0)
    return () => {
      ClientSocket.emit("LIVE_FEED_RELEASE")
    }
  }, [])

  return (
    <div className="case" id="case">
      <Article title={caseTranslation.title} type="center" className="case-page-article">
        {caseTranslation.desc}
      </Article>
      <CaseContainer id={caseId} weapons={weapons} locationState={props.location.state} />
      <Inventory weapons={weapons} />
    </div>
  )
}
