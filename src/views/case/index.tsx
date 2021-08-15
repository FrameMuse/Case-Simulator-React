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
import { useEffect } from "react"
import ClientSocket from "app/socket/ClientSocket"
import CaseContainer from "./CaseContainer"
import Inventory from "./inventory"
import DataBase from "database"
import { WeaponItemProps } from "resources/interfaces/weapon"
import { getMockRandom } from "resources/utils"

export default (props: ViewProps<{ caseId: number, isBonus?: boolean }>) => {
  const { caseId } = props.match.params
  const weapons = DataBase.data.Weapons.slice(-getMockRandom(caseId, 2)) as WeaponItemProps[]
  const caseTranslation = useTranslation(trans => trans.cases[caseId])

  useEffect(() => {
    return () => {
      ClientSocket.emit("LIVE_FEED_RELEASE")
    }
  }, [])

  return (
    <div className="case">
      <Article title={caseTranslation.title} type="center" className="case-page-article">
        {caseTranslation.desc}
      </Article>
      <CaseContainer id={caseId} weapons={weapons} />
      <Inventory weapons={weapons} />
    </div>
  )
}
