/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import Button from "../../app/components/UI/Button"
import { getCasePage } from "../../app/api/actions"
import { Article } from "../../app/components/formatting/article"
import { useSelector } from "react-redux"
import { TimerCountDown } from "app/components/UI/Timer"
import BrowserHistory from "resources/stores/BrowserHistory"
import { useContextQuery } from "app/components/other/MutuableQuery"
import AuthRequired from "app/components/other/AuthRequired"
import { getDemo } from "app/components/other/MiniAccount"
import useTranslation from "resources/hooks/useTranslation"

export function UnAuthException() {
  const trans = useTranslation(trans => trans.views.case.exceptions)
  return (
    <div className="case-page-exception">
      <Article className="case-page-exception-article" title={trans.unauthed?.title}>
        <em>
          {trans.unauthed?.desc}
        </em>
      </Article>
      <AuthRequired onlyButton padding="1.5em 5.5em" />
    </div>
  )
}
export function InSufficientBalanceException(props: { cost: number }) {
  const user = useSelector(state => state.user)
  const modes = useSelector(state => state.modes)
  const trans = useTranslation(trans => trans.views.case.exceptions)
  const { payload } = useContextQuery<ReturnType<typeof getCasePage>>()

  const balance = payload.case.payForBonus ? user.bonus_balance : (modes.demo ? user.demo_balance : user.balance)
  const toPay = props.cost - balance
  const title = `${toCurrency(props.cost)} - ${trans.insufficient?.title} ${toCurrency(toPay)}`

  function goHome() {
    BrowserHistory.push("/")
  }

  function goToPayment() {
    BrowserHistory.push("/payment", { condition: toPay })
  }

  function toCurrency(price: number) {
    if (payload.case.payForBonus) {
      return price.toFixed(2) + " B"
    }
    return price.toPrice()
  }

  function renderButton() {
    if (modes.demo) {
      return (
        <Button color="orange" padding="1.5em 5em" onClick={getDemo}>
          {trans.insufficient?.getDemo}
        </Button>
      )
    }

    if (payload.case.payForBonus) {
      return (
        <Button color="green" padding="1.5em 5em" onClick={goHome}>
          {trans.insufficient?.getBonus}
        </Button>
      )
    }

    return (
      <Button color="green" padding="1.5em 5em" onClick={goToPayment}>
        {trans.insufficient?.button}
      </Button>
    )
  }

  return (
    <div className="case-page-exception">
      <Article className="case-page-exception-article" title={title}>
        <em>{trans.insufficient?.desc}</em>
      </Article>
      {renderButton()}
    </div>
  )
}
export function LimitException() {
  const { payload } = useContextQuery<ReturnType<typeof getCasePage>>()
  const trans = useTranslation(trans => trans.views.case.exceptions)
  return (
    <div className="case-page-exception">
      <Article className="case-page-exception-article" title={trans.limit?.title}>
        <em>
          <TimerCountDown distance={payload.case.time} />
        </em>
      </Article>
    </div>
  )
}
