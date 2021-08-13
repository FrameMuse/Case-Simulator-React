/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SCSS
import "../../assets/scss/views/case.scss"
// STAFF
import { Article } from "../../app/components/formatting/article"
import { ViewProps } from "../../resources/interfaces/router"
import CaseContainer from "./CaseContainer"
import Inventory from "./inventory"
import { getCasePage } from "../../app/api/actions"
import useTranslation from "../../resources/hooks/useTranslation"
import { QueryCunsumer, QueryProvider, useContextQuery } from "../../app/components/other/MutuableQuery"
import { createElement, useEffect, useState } from "react"
import { classWithModifiers } from "../../resources/utils"
import FrequentQuestions from "views/support/FrequentQuestions"
import { useSelector } from "react-redux"
import { TemperateCashback } from "./CaseState"
import BonusLevel from "app/components/other/BonusLevel"
import { view } from "app/Router"
import ClientSocket from "app/socket/ClientSocket"

export default (props: ViewProps<{ caseId: number, isBonus?: boolean }>) => {
  const { caseId, isBonus } = props.match.params
  const bonusId = useSelector(state => state.user.bonusCase?.case_id)
  const modes = useSelector(state => state.modes)

  const casePageTrans = useTranslation(trans => trans.views.case)
  const caseTranslation = useTranslation(trans => trans.cases[caseId])

  const [multiplier, setMultiplier] = useState(1)

  if (Number(caseId) === bonusId && !isBonus) {
    return createElement(view("errors/404"))
  }

  useEffect(() => {
    return () => {
      ClientSocket.emit("LIVE_FEED_RELEASE")
    }
  }, [])

  return (
    <QueryProvider action={getCasePage(caseId)}>
      <div className="case">
        <Article title={caseTranslation.title} type="center" className="case-page-article">
          {caseTranslation.desc}
        </Article>
        <QueryCunsumer<ReturnType<typeof getCasePage>>>
          {({ payload }) => !payload.case.free_count && (Boolean(payload.case.is_cashback) || Boolean(payload.case.is_bonus)) && !modes.demo && (
            <div className="case-benefits">
              <div className="case-benefits__container">
                {Boolean(payload.case.is_cashback) && (
                  <CaseBenefit symbol="%" color="green">
                    +<TemperateCashback extraValue={payload.case.cashback * multiplier} /> {casePageTrans.benefitText1}
                  </CaseBenefit>
                )}
                {Boolean(payload.case.is_bonus) && (
                  <CaseBenefit symbol="B" color="orange">
                    +{(payload.case.price * 0.1 * multiplier).toFixed(2)} B {casePageTrans.benefitText2}
                  </CaseBenefit>
                )}
              </div>
            </div>
          )}
        </QueryCunsumer>
        <CaseContainer setMultiplier={setMultiplier} />
        <QueryCunsumer<ReturnType<typeof getCasePage>>>
          {({ payload }) => payload.case.price > 0 && !payload.case.payForBonus && (
            <BonusLevel type="case" />
          )}
        </QueryCunsumer>
      </div>
      <ConditionsUpdater />
      <Inventory />
      <FrequentQuestions defaultQuestion="cases" />
    </QueryProvider>
  )
}

function ConditionsUpdater() {
  const user = useSelector(state => state.user)
  const { payload, modifyPayload } = useContextQuery<ReturnType<typeof getCasePage>>()
  function deleteCondition(id: number) {
    if (!payload.case.Conditions) return

    const Conditions = payload.case.Conditions
    const condition = Conditions.find(condition => condition.data.id === id)
    if (condition) {
      const conditionIndex = Conditions.indexOf(condition)

      // Display that all conditions completed
      if (Conditions.length <= 1) {
        Conditions.splice(conditionIndex, 1, {
          ...condition,
          data: {
            ...condition.data,
            done: 1
          }
        })
        return
      }

      Conditions.splice(conditionIndex, 1)
    }
    modifyPayload({
      ...payload,
      case: {
        ...payload.case,
        Conditions
      }
    })
  }
  useEffect(() => {
    if (!payload) return
    if (user.vkgroup) deleteCondition(1)
    if (user.vksms) deleteCondition(2)
  }, [user.vksms, user.vkgroup, modifyPayload])
  return null
}

interface CaseBenefitProps {
  symbol: string
  color?: "orange" | "green"
  children: any
}

function CaseBenefit(props: CaseBenefitProps) {
  return (
    <div className="case-benefits__benefit">
      <div className={classWithModifiers("case-benefits__circle", [props.color])}>
        <span className="case-benefits__symbol">{props.symbol}</span>
      </div>
      <span className="case-benefits__desc">{props.children}</span>
    </div>
  )
}
