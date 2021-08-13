/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import FrequentQuestions from "views/support/FrequentQuestions"
import { fetchBattleInfo } from "../../app/api/actions"
import { Article } from "../../app/components/formatting/article"
import BonusLevel from "../../app/components/other/BonusLevel"
import MutuableQuery from "../../app/components/other/MutuableQuery"
import WeaponList from "../../app/components/Standoff/WeaponList"
import useTranslation from "../../resources/hooks/useTranslation"
import { ViewProps } from "../../resources/interfaces/router"
import Battle from "./battle"

export default ({ location, history }: ViewProps<{ battleId?: number }>) => {
  const state: { battle_id: number, referred: boolean } | undefined = location.state as any

  const battle = useTranslation(trans => trans.views.battle)
  const cases = useTranslation(trans => trans.cases)

  if (!state) {
    history.replace("/battles", undefined)
    return null
  }

  return (
    <>
      <MutuableQuery requireAuth action={fetchBattleInfo(state.battle_id)}>
        {function ({ payload }) {
          const caseTranslation = cases[payload.battle.case.id]
          return (
            <div className="battle">
              <Article type="center" title={battle.article?.pageTitle}>
                {caseTranslation?.title || "Not translated"}
              </Article>
              <Battle {...state} {...payload} />
              <BonusLevel type="battle" />
              <div className="battle-inventory">
                <Article type="center" title={battle.article?.inventoryTitle} />
                <div className="case-inventory__container">
                  {/* <WeaponsList weapons={Array(50).fill(weapon)} /> */}
                  <WeaponList items={payload.items} />
                </div>
              </div>
            </div>
          )
        }}
      </MutuableQuery>
      <section className="section section--1">
        <FrequentQuestions defaultQuestion="battles" />
      </section>
    </>
  )
}
